import mongoose from "mongoose";
const { Schema } = mongoose;

const notesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  tag: {
    type: "string",
    default: "General",
  },
  date: {
    type: "Date",
    default: Date.now,
  },
});

export default mongoose.model("notes", notesSchema);
