import express from "express";

import Section from "../models/Section.js";
import Subject from "../models/Subject.js";
import Timetable from "../models/Timetable.js";

import { generateTimetable }
from "../utils/generateTimetable.js";

const router = express.Router();


// ======================================
// GENERATE STUDENT TIMETABLE
// ======================================

router.get("/generate", async (req, res) => {

  try {

    // =========================
    // FETCH DATA
    // =========================

    const sections =
      await Section.find()
      .populate("subjects");

    const subjects =
      await Subject.find()
      .populate("facultyId");

    // =========================
    // VALIDATIONS
    // =========================

    if (!sections.length) {

      return res.status(400).json({
        message:
          "No sections found"
      });
    }

    if (!subjects.length) {

      return res.status(400).json({
        message:
          "No subjects found"
      });
    }

    // Only subjects with faculty assigned
    const validSubjects =
      subjects.filter(
        (s) => s.facultyId
      );

    if (!validSubjects.length) {

      return res.status(400).json({
        message:
          "Subjects must have faculty assigned"
      });
    }

    // =========================
    // GENERATE TIMETABLE
    // =========================

    const generated =
      generateTimetable(
        sections,
        validSubjects
      );

    // =========================
    // CLEAR OLD TIMETABLE
    // =========================

    await Timetable.deleteMany({});

    // =========================
    // SAVE TIMETABLE
    // =========================

    for (const sec of generated) {

      const sectionDoc =
        sections.find(
          (s) => s.name === sec.section
        );

      if (!sectionDoc) continue;

      for (const day in sec.timetable) {

        await Timetable.create({

          sectionId:
            sectionDoc._id,

          day,

          slots:
            sec.timetable[day]

        });

      }

    }

    // =========================
    // RESPONSE
    // =========================

    res.json({

      message:
        "Timetable generated successfully",

      studentTimetable:
        generated

    });

  } catch (err) {

    console.error(
      "Generate timetable error:",
      err
    );

    res.status(500).json({

      message:
        err.message

    });

  }

});


// ======================================
// GET STUDENT TIMETABLE
// ======================================

router.get("/", async (req, res) => {

  try {

    const timetable =
      await Timetable.find()
      .populate("sectionId");

    res.json(timetable);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

export default router;