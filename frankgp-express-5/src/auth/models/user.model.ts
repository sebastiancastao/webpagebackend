import { Schema, model, Document } from "mongoose";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
  COLLABORATOR = "collaborator",
  DEVELOPER = "developer",
  GUEST = "guest",
}

export interface IUser extends Document {
  googleId?: string;
  name?: string;
  username?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  whatsapp?: string;
  password?: string;
  photo?: string;
  role: UserRole;
  isVisible: boolean;
  rawGoogle?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    googleId: { type: String },
    name: { type: String },
    username: { type: String, unique: true, sparse: true },
    lastName: { type: String, maxlength: 100 },
    displayName: { type: String, maxlength: 100 },
    email: { type: String, unique: true, sparse: true }, // `sparse` permite valores nulos repetidos
    whatsapp: { type: String },
    password: { type: String, select: true },
    photo: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    isVisible: { type: Boolean, default: true },
    rawGoogle: { type: String },
  },
  {
    timestamps: true, // Crea createdAt y updatedAt automáticamente
  }
);

export default model<IUser>("User", UserSchema);
