import express from "express";
import Faculty from "../models/Faculty.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Faculty.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.json({ message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;