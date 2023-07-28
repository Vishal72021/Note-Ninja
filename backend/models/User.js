import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  Name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
  date: {
    type: "Date",
    default: Date.now(),
  },
});

export default mongoose.model("user", userSchema);
