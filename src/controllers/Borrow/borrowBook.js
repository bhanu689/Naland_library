import { Book } from "../../model/book.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Borrow } from "../../model/borrow.model.js";

const borrowBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required Fields missing"));
    }

    
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "Book with provided ID does not exist!"));
    }

    if (book.copies <= 0) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "Book not available!"));
    }

   
    const borrow = await Borrow.findOne({
      $and: [{ _id: id }, { user: req.user._id }],
    });

    if (borrow && !borrow.returnedDate) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "You have already borrowed this book!"));
    }

    // Create a new borrow record if it's a new borrowing
    const newBorrow = new Borrow({
      user: req.user._id,
      book: id,
      borrowedDate: new Date(),
    });

    book.copies -= 1;
    book.borrowedCount += 1;

    await newBorrow.save();
    await book.save();

    res
      .status(200)
      .send(new ApiResponse(200, { book, borrow: newBorrow }, "Book borrowed!"));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Failed!"));
  }
};

export { borrowBook };
