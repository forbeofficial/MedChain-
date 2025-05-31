const express = require("express");
const router = express.Router();
const { Diagnostics, Patient, User } = require("../models/user");


router.post("/add", async (req, res) => {
    try {
        const { userId, diagnosis, notes, reportURL } = req.body;

        // Optional: Verify if user exists and is a patient
        const patient = await Patient.findOne({ userId });
        if (!patient) return res.status(404).json({ error: "Patient not found" });

        const diagnostic = new Diagnostics({
            userId,
            diagnosis,
            notes,
            reportURL,
            date: new Date()
        });

        await diagnostic.save();
        res.status(201).json({ message: "Diagnostic record added", diagnostic });
    } catch (error) {
        console.error("Add diagnostics error:", error.stack);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// GET: Get diagnostics by patient userId
router.get("/:userId", async (req, res) => {
    try {
        const diagnostics = await Diagnostics.find({ userId: req.params.userId }).sort({ date: -1 });
        if (!diagnostics.length) return res.status(404).json({ error: "No diagnostics found" });

        res.json(diagnostics);
    } catch (error) {
        console.error("Fetch diagnostics error:", error.stack);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

module.exports = router;
