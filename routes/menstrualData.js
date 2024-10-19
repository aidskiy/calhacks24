const express = require("express");
const router = express.Router();
const MenstrualData = require("../models/MenstrualData");

// Middleware to extract deviceId from request headers
router.use((req, res, next) => {
  const deviceId = req.headers["device-id"];
  if (!deviceId) {
    return res.status(400).json({ error: "Device ID is required" });
  }
  req.deviceId = deviceId;
  next();
});

// Create a new menstrual data entry
router.post("/", async (req, res) => {
  try {
    const data = new MenstrualData({
      deviceId: req.deviceId,
      ...req.body,
    });
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all menstrual data entries for the device
router.get("/", async (req, res) => {
  try {
    const data = await MenstrualData.find({ deviceId: req.deviceId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific menstrual data entry
router.get("/:id", async (req, res) => {
  try {
    const data = await MenstrualData.findOne({
      _id: req.params.id,
      deviceId: req.deviceId,
    });
    if (!data) {
      return res.status(404).json({ error: "Entry not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a menstrual data entry
router.put("/:id", async (req, res) => {
  try {
    const data = await MenstrualData.findOneAndUpdate({ _id: req.params.id, deviceId: req.deviceId }, req.body, { new: true });
    if (!data) {
      return res.status(404).json({ error: "Entry not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a menstrual data entry
router.delete("/:id", async (req, res) => {
  try {
    const data = await MenstrualData.findOneAndDelete({
      _id: req.params.id,
      deviceId: req.deviceId,
    });
    if (!data) {
      return res.status(404).json({ error: "Entry not found" });
    }
    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
