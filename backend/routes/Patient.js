const express = require("express");
const router = express.Router();
const { Patient, User } = require("../models/user");

router.get("/profile/:userId", async (req, res) => {
    try {
        const patient = await Patient.findOne({ userId: req.params.userId }).populate("userId", "-password");
        if (!patient) return res.status(404).json({ error: "Patient not found" });

        res.json(patient);
    } catch (error) {
        console.error("Patient profile fetch error:", error.stack);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

router.put("/profile/:userId", async (req, res) => {
    try {
        const updated = await Patient.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true }
        ).populate("userId", "-password");

        if (!updated) return res.status(404).json({ error: "Patient not found" });
        res.json({ message: "Patient profile updated", data: updated });
    } catch (error) {
        console.error("Patient profile update error:", error.stack);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

module.exports = router;
