import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true, max: 80 },
  last_name: { type: String, required: true, max: 80 },
  email: { type: String, required: true, unique: true, max: 80 },
  age: { type: Number, required: true, max: 100, min: 18 },
  password: { type: String, required: true, max: 80 },
});

export const userModel = mongoose.model(userCollection, userSchema);