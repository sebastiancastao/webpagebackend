// src/module/shortener/models/shortener.model.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IShortener extends Document {
  backHalf: string;
  destination: string;
  createdAt: Date;
  updatedAt: Date;
}

const ShortenerSchema = new Schema<IShortener>(
  {
    backHalf: { type: String, unique: true, required: true },
    destination: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IShortener>("Shortener", ShortenerSchema);
