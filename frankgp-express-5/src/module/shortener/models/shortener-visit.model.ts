// src/module/shortener/models/shortener-visit.model.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IShortenerVisit extends Document {
  ip?: string;
  userAgent?: string;
  referrer?: string;
  country?: string;
  city?: string;
  device?: string;
  visitedAt: Date;
  shortenerId: Types.ObjectId;
}

const ShortenerVisitSchema = new Schema<IShortenerVisit>(
  {
    ip: String,
    userAgent: String,
    referrer: String,
    country: String,
    city: String,
    device: String,
    visitedAt: { type: Date, default: Date.now },
    shortenerId: { type: Schema.Types.ObjectId, ref: "Shortener", required: true },
  },
  { timestamps: false }
);

export default model<IShortenerVisit>("ShortenerVisit", ShortenerVisitSchema);
