import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import facultyRoutes from "./routes/facultyRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import sectionRoutes from "./routes/sectionRoutes.js";
import timetableRoutes from "./routes/timetableRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/faculty", facultyRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/timetable", timetableRoutes);

app.get("/", (req, res) => {
  res.send("Timetable Generator API Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port " + (process.env.PORT || 5000));
    });
  })
  .catch((err) => console.log(err));