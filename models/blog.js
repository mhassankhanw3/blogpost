import mongoose, { model, Schema, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    userProfId: { type: String },
    username: { type: String, required: true },
    emailAddress: { type: String, required: true },
    profileImageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Blog = models.Blog || model("Blog", BlogSchema);
