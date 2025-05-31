const express = require("express");
const router = express.Router();
const { Doctor, User } = require("/models/user");

//sample for getting doctor details via user id, nee 2 times duplicate cheyyttt, already ath models/user.js il ind 
router.get("/profile/:userId", async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.params.userId }).populate("userId", "-password");
        if (!doctor) return res.status(404).json({ error: "Doctor not found" });

        res.json(doctor);
    } catch (error) {
        console.error("Doctor profile fetch error:", error.stack);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});


module.exports = router;
