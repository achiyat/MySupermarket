// src/models/User.ts
import bcrypt from "bcrypt";
import mongoose, { Schema, Document } from "mongoose";

// Define the IUser interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create the User schema
const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save hook to hash the password before saving the user
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash the password if it's modified
  try {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("Error occurred while hashing password:", error);
    next(error as Error);
  }
});

// Method to compare the candidate password with the stored hashed password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the User model
export default mongoose.model<IUser>("users", UserSchema);
