import { mongoose } from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      uniquie: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  },
);

export const URL = mongoose.model("url", urlSchema);
