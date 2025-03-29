require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const authMiddleware = require('./middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const Medication = require('./models/medication');
const Allergy = require('./models/Allergy');
const LabResult = require('./models/labresults');

const app = express();

// Database connection
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));


const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, ${Date.now()}-${file.originalname});
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|pdf/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (extname && mimetype) return cb(null, true);
        cb(new Error('Only images and PDFs are allowed'));
    }
});


const userValidationSchema = z.object({
    name: z.string().min(3).max(20),
    username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    phone: z.string().regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
    userType: z.enum(["doctor", "patient"]).default("patient"),
    specialization: z.string().min(1).optional(),
    licenseNumber: z.string().regex(/^[A-Z0-9-]{6,12}$/).optional(),
    hospital: z.string().min(1).max(100).optional()
}).refine(
    data => data.userType !== "doctor" || (data.specialization && data.licenseNumber && data.hospital),
    { message: "Doctor fields are required", path: ["specialization"] }
);

const loginValidationSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters")
});

const medicationValidationSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    name: z.string().min(2, "Medication name is required"),
    dosage: z.string().min(2, "Dosage is required"),
    frequency: z.string().min(2, "Frequency is required"),
    startDate: z.string().refine(date => !date || !isNaN(Date.parse(date)), { message: "Invalid start date" }).optional(),
    endDate: z.string().refine(date => !date || !isNaN(Date.parse(date)), { message: "Invalid end date" }).optional()
}).refine(
    data => !data.startDate || !data.endDate || new Date(data.startDate) <= new Date(data.endDate),
    { message: "Start date must be before end date", path: ["endDate"] }
);

const labResultValidationSchema = z.object({
    userId: z.string().min(1, "Patient ID is required"),
    testName: z.enum(["Blood Test", "Urine Test", "Imaging Test", "other"]),
    resultValue: z.string().min(1, "Result value is required"),
    date: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Invalid date" }).optional(),
    notes: z.string().max(500).optional()
});

const allergyValidationSchema = z.object({
    userId: z.string().min(1, "Patient ID is required"),
    allergen: z.string().min(1, "Allergen is required"),
    reaction: z.string().min(1, "Reaction is required"),
    severity: z.enum(['mild', 'moderate', 'severe']),
    dateDiagnosed: z.string().refine(date => !date || !isNaN(Date.parse(date)), { message: "Invalid date" }).optional()
});

// Routes

// Signup
app.post('/api/auth/signup', async (req, res) => {
    const validation = userValidationSchema.safeParse(req.body);
    if (!validation.success) return res.status(400).json({ errors: validation.error.errors });

    try {
        const { name, username, email, password, phone, userType, specialization, licenseNumber, hospital } = req.body;

        const [existingUser, existingUsername] = await Promise.all([
            User.findOne({ email }),
            User.findOne({ username })
        ]);
        if (existingUser) return res.status(400).json({ error: 'Email already exists' });
        if (existingUsername) return res.status(400).json({ error: 'Username already exists' });

        const user = new User({ name, username, email, password, phone, userType });
        await user.save();

        if (userType === "doctor") {
            const existingDoctor = await Doctor.findOne({ licenseNumber });
            if (existingDoctor) {
                await User.deleteOne({ _id: user._id });
                return res.status(400).json({ error: 'Doctor with this license number exists' });
            }

            const doctor = new Doctor({ userId: user._id, specialization, licenseNumber, hospital });
            await doctor.save();
        }

        const token = jwt.sign({ id: user._id, userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User created successfully', token, userId: user._id });
    } catch (error) {
        console.error('Signup Error:', error.stack);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const validation = loginValidationSchema.safeParse(req.body);
    if (!validation.success) return res.status(400).json({ errors: validation.error.errors });

    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token, userId: user._id });
    } catch (error) {
        console.error('Login Error:', error.stack);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Medications
app.post('/api/health/medications', authMiddleware, async (req, res) => {
    if (req.user.userType !== 'doctor') return res.status(403).json({ error: 'Forbidden' });

    const validation = medicationValidationSchema.safeParse(req.body);
    if (!validation.success) return res.status(400).json({ errors: validation.error.errors });

    try {
        const { userId, name, dosage, frequency, startDate, endDate } = req.body;
        const medication = new Medication({
            user: userId,
            name,
            dosage,
            frequency,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined
        });
        await medication.save();
        res.status(201).json({ message: 'Medication added', medication });
    } catch (error) {
        console.error('Add Medication Error:', error.stack);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

app.get('/api/health/medications', authMiddleware, async (req, res) => {
    try {
        const medications = await Medication.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(medications);
    } catch (error) {
        console.error('Get Medications Error:', error.stack);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Lab Results
 // Ensure this is at the top

app.post('/api/health/labresults', authMiddleware, async (req, res) => {
    if (req.user.userType !== 'doctor') return res.status(403).json({ error: 'Forbidden' });

    const validation = labResultValidationSchema.safeParse(req.body);
    if (!validation.success) return res.status(400).json({ errors: validation.error.errors });

    try {
        const { userId, testName, resultValue, date, notes } = req.body;
        const parsedDate = date ? new Date(date) : new Date();

        const existingLabResult = await LabResult.findOne({
            user: userId,
            testName,
            date: {
                $gte: parsedDate.setHours(0, 0, 0, 0),
                $lt: parsedDate.setHours(23, 59, 59, 999)
            }
        });
        if (existingLabResult) return res.status(400).json({ error: 'Lab result already exists for this date' });

        const labResult = new LabResult({
            user: userId,
            testName,
            resultValue,
            date: parsedDate,
            notes,
            reportId: REP-${Date.now()}-${Math.floor(Math.random() * 1000)} 
        });

        console.log('LabResult before save:', labResult.toObject());
        await labResult.save();
        console.log('LabResult after save:', labResult.toObject());

        res.status(201).json({ message: 'Lab result added', labResult });
    } catch (error) {
        console.error('Add Lab Result Error:', error.stack);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

app.get('/api/health/labresults', authMiddleware, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    try {
        const [labResults, total] = await Promise.all([
            LabResult.find({ user: req.user.id })
                .skip(skip)
                .limit(parseInt(limit))
                .sort({ date: -1 }),
            LabResult.countDocuments({ user: req.user.id })
        ]);
        res.json({
            labResults,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get Lab Results Error:', error.stack);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Allergies
app.post('/api/health/allergies', authMiddleware, async (req, res) => {
    if (req.user.userType !== 'doctor') return res.status(403).json({ error: 'Forbidden' });

    const validation = allergyValidationSchema.safeParse(req.body);
    if (!validation.success) return res.status(400).json({ errors: validation.error.errors });

    try {
        const { userId, allergen, reaction, severity, dateDiagnosed } = req.body;
        const allergy = new Allergy({
            user: userId,
            allergen,
            reaction,
            severity,
            dateDiagnosed: dateDiagnosed ? new Date(dateDiagnosed) : undefined
        });
        await allergy.save();
        res.status(201).json({ message: 'Allergy added', allergy });
    } catch (error) {
        console.error('Add Allergy Error:', error.stack);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

app.get('/api/health/allergies', authMiddleware, async (req, res) => {
    try {
        const allergies = await Allergy.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(allergies);
    } catch (error) {
        console.error('Get Allergies Error:', error.stack);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});


app.post('/api/lab/upload', authMiddleware, upload.single('reportFile'), async (req, res) => {
    if (req.user.userType !== 'doctor') {
        return res.status(403).json({ error: 'Forbidden' });
    }

    try {
        const { patient, testType, result, date, notes } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ error: 'Report file is required' });
        }

        const userExists = await User.findById(patient);
        if (!userExists) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const parsedDate = date ? new Date(date) : new Date();
        if (date && isNaN(parsedDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const newReport = new LabResult({
            user: patient,
            testName: testType,
            resultValue: result,
            date: parsedDate,
            reportFile: path.normalize(req.file.path),
            notes: notes || ''
        });

        await newReport.save();
        res.status(201).json({ message: 'Lab report uploaded', report: newReport });
    } catch (error) {
        console.error('Upload Lab Report Error:', error.stack);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});


// Delete Lab Report
app.delete('/api/lab/delete/:reportId', authMiddleware, async (req, res) => {
    if (req.user.userType !== 'doctor') return res.status(403).json({ error: 'Forbidden' });

    try {
        const report = await LabResult.findOneAndDelete({ reportId: req.params.reportId });
        if (!report) return res.status(404).json({ error: 'Report not found' });
        if (report.reportFile) require('fs').unlinkSync(report.reportFile);
        res.json({ message: 'Report deleted' });
    } catch (error) {
        console.error('Delete Lab Report Error:', error.stack);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});


app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'File upload error', details: err.message });
    }
    if (err) {
        console.error('Global Error:', err.stack);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
    next();
});

/////////////////////////////////


///////////////////////////////////
app.get('/api/auth/verify-token', (req, res) => {
    const authHeader = req.headers.authorization;
    
    // Check if the authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        
        res.json({ message: "Token is valid", user: decoded });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(Server running on port ${PORT});
});
