import { Book } from "../../model/book.model.js";
import { Borrow } from "../../model/borrow.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const returnBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Required Fields missing" });
    }

    const borrow = await Borrow.findOne({
      $and: [{ _id: id }, { user: req.user._id }],
    });

    if (!borrow) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "Borrow record not found!"));
    }

    const book = await Book.findOne({ id });

    if (!book) {
      return res
      .status(404)
      .send(
        new ApiResponse(404, null, "Book with provided ID does not exist!")
      );
  }

  if (!borrow.returnedDate) {
    book.copies += 1;
    borrow.returnedDate = new Date();

    await borrow.save();
    await book.save();
    res
      .status(200)
      .send(new ApiResponse(200, { book, borrow }, "Book returned!"));
  } else {
    res
      .status(400)
      .send(new ApiResponse(400, null, "Book has already been returned!"));
  }
} catch (error) {
  console.log(error);
  res.status(500).send(new ApiResponse(500, error, "Failed!"));
}
};

export { returnBook };