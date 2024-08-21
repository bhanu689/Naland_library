import mongoose from "mongoose";

const BorrowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: true,
  },
  borrowedDate: {
    type: Date,
  },
  returnedDate: {
    type: Date,
  },
});

export const Borrow = mongoose.model("borrow", BorrowSchema);
