import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: Number,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  copies: {
    type: Number,
    default: 1,
  },
  borrowedCount: {
    type: Number,
    default: 0,
  },
});

export const Book = mongoose.model("book", bookSchema);
