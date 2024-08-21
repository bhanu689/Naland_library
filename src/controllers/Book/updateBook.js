import { Book } from "../../model/book.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, author, ISBN, publicationDate, genre, copies } = req.body;

    if (
      !id ||
      !title ||
      !author ||
      !ISBN ||
      !publicationDate ||
      !genre ||
      !copies
    ) {
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

    const updated = await Book.findByIdAndUpdate(
      id,
      { title, author, ISBN, publicationDate, genre, copies },
      { new: true }
    );

    res
      .status(200)
      .send(new ApiResponse(200, updated, "Book updated sucessfully"));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, null, "Failed to update book!"));
  }
};

export { updateBook };
