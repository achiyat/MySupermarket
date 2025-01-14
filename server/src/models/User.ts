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
  phone: string;
  address: string;
  active: boolean;
  employeeFields?: {
    stores: string[];
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    phone: { type: String, required: true, default: "" },
    address: { type: String, default: "" },
    active: { type: Boolean, default: true },
    employeeFields: {
      stores: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Store", default: [] },
      ],
    },
  },
  { collection: "users" }
);

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
    return next(error as Error);
  }

  // Remove unnecessary fields based on role
  cleanFields(user);

  next();
});

// Post-findOne hook to clean up fields after retrieval
UserSchema.post("findOne", function (doc, next) {
  if (doc) {
    cleanFields(doc);
  }

  next();
});

// Accept all users except the system administrator
UserSchema.post("find", function (docs, next) {
  if (docs) {
    const filteredDocs = docs.filter(
      (doc: IUser) => doc.role !== "administrator"
    );

    filteredDocs.forEach((doc: IUser) => cleanFields(doc));
    docs.length = 0;
    docs.push(...filteredDocs);
  }
  next();
});

const cleanFields = (user: IUser) => {
  if (user.role !== "employee") {
    user.employeeFields = undefined;
  }
};

UserSchema.post("findOneAndUpdate", async function (doc: any, next: any) {
  if (doc) {
    cleanFields(doc);
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
const User: Model<IUser> = mongoose.model("User", UserSchema);

export { User, IUser, Role };
