import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    time: String,
    subject: String,
    faculty: String,
    type: String
  },
  { _id: false }
);

const timetableSchema = new mongoose.Schema({
  sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
  day: { type: String, required: true },
  slots: [slotSchema]
});

export default mongoose.model("Timetable", timetableSchema);