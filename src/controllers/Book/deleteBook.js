import { Book } from "../../model/book.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing!"));
    }
    const book = await Book.findById(id);

    if (!book) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "Book not found!"));
    }

    await Book.findByIdAndDelete(id);
    res
      .status(200)
      .send(new ApiResponse(200, null, "Book deleted successfully!"));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, null, "Failed to delete book!"));
  }
};

export { deleteBook };
