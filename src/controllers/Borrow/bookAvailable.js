import { Book } from "../../model/book.model.js";
import { Borrow } from "../../model/borrow.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getBookAvailability = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const borrowedBooks = await Borrow.countDocuments({ returnDate: null });
    const availableBooks = totalBooks - borrowedBooks;

    res
      .status(200)
      .send(new ApiResponse(200, { totalBooks, borrowedBooks, availableBooks }, "Book availability summary retrieved successfully!"));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to retrieve book availability summary!"));
  }
};

export { getBookAvailability };
