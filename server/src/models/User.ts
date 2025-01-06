// server/src/models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

enum Role {
  Administrator = "administrator",
  Employee = "employee",
  Buyer = "buyer",
}

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: Role;
  active: boolean;
  adminFields?: {
    users: string[];
    categories: string[];
  };
  employeeFields?: {
    stores: string[];
  };
  buyerFields?: {
    address: string;
    phone: string;
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(Role), required: true },
  active: { type: Boolean, default: true },
  adminFields: {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    categories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: [] },
    ],
  },
  employeeFields: {
    stores: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Store", default: [] },
    ],
  },
  buyerFields: {
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
});

// Pre-save hook to hash the password before saving the user
UserSchema.pre("save", async function (next) {
  const user = this as IUser;

  // Check if the email or username already exists in the database
  const existingUser = await User.findOne({
    email: user.email,
    username: user.username,
  });
  if (existingUser) {
    if (existingUser.email === user.email)
      return next(new Error("Email already in use"));
    if (existingUser.username === user.username)
      return next(new Error("User Name already in use"));
  }

  if (!user.isModified("password"))
    return next(new Error("Password not modified"));

  try {
    const salt = await bcrypt.genSalt(6);
    user.password = await bcrypt.hash(user.password, salt);
  } catch (error) {
    console.error("Error occurred while hashing password:", error);
    next(error as Error);
  }

  // Remove unnecessary fields based on role
  if (user.role === "administrator") {
    user.employeeFields = undefined;
    user.buyerFields = undefined;
  } else if (user.role === "employee") {
    user.adminFields = undefined;
    user.buyerFields = undefined;
  } else if (user.role === "buyer") {
    user.adminFields = undefined;
    user.employeeFields = undefined;
  }

  next();
});

// Post-findOne hook to clean up fields after retrieval
UserSchema.post("findOne", function (doc, next) {
  if (doc) {
    if (doc.role === "administrator") {
      doc.employeeFields = undefined;
      doc.buyerFields = undefined;
    } else if (doc.role === "employee") {
      doc.adminFields = undefined;
      doc.buyerFields = undefined;
    } else if (doc.role === "buyer") {
      doc.adminFields = undefined;
      doc.employeeFields = undefined;
    }
  }

  next();
});

UserSchema.post("findOneAndUpdate", async function (doc: any, next: any) {
  if (doc) {
    if (doc.role === "administrator") {
      doc.employeeFields = undefined;
      doc.buyerFields = undefined;
    } else if (doc.role === "employee") {
      doc.adminFields = undefined;
      doc.buyerFields = undefined;
    } else if (doc.role === "buyer") {
      doc.adminFields = undefined;
      doc.employeeFields = undefined;
    }
  }

  next();
});

// Method to compare candidate password with the stored hashed password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password); // Compare hashed password with candidate
};

// Specify collection name as 'users'
const User: Model<IUser> = mongoose.model("users", UserSchema);

export { User, IUser, Role };
