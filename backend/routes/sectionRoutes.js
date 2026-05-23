import express from "express";
import Section from "../models/Section.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const section = await Section.create(req.body);
    res.json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const sections = await Section.find().populate("subjects");
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Section.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Section not found" });
    res.json({ message: "Section deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;