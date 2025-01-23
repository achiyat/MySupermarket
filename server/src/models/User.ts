import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

type Role = "administrator" | "employee" | "buyer";

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
    role: { type: String, required: true },
    phone: { type: String, required: true, default: "" },
    address: { type: String, default: "" },
    active: { type: Boolean, default: true },
    employeeFields: {
      stores: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Store" }],
        default: undefined, // Only include when explicitly set
      },
    },
  },
  {
    collection: "users",
    toJSON: {
      transform: (_, ret) => {
        // Exclude sensitive and irrelevant fields
        delete ret.password;

        // Remove `employeeFields` if the user is not an employee
        if (ret.role !== "employee") {
          delete ret.employeeFields;
        }
        return ret;
      },
    },
  }
);

// Pre-save hook to hash the password and handle `employeeFields`
UserSchema.pre("save", async function (next) {
  const user = this as IUser;

  // Hash password if modified
  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(6);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
      console.error("Error occurred while hashing password:", error);
      return next(error as Error);
    }
  }

  // Ensure `employeeFields` is set if the role is `employee`
  if (user.role === "employee" && !user.employeeFields) {
    user.employeeFields = { stores: [] };
  }

  next();
});

// Pre-update hook to handle role changes
UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as any;

  // If the role is being changed to `employee`, ensure `employeeFields` is added
  if (update?.role === "employee" && !update.employeeFields) {
    update.employeeFields = { stores: [] };
  }

  // If the role is not `employee`, remove `employeeFields` from the update
  if (update?.role && update.role !== "employee") {
    update.$unset = { ...update.$unset, employeeFields: "" };
  }

  next();
});

// Post-find hook to ensure `employeeFields` is included only for employees
UserSchema.post("find", function (docs, next) {
  docs.forEach((doc: IUser) => {
    if (doc.role !== "employee" && doc.employeeFields) {
      doc.employeeFields = undefined;
    }
  });
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
