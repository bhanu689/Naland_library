import { Book } from "../../model/book.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const addBook = async (req, res) => {
  try {
    const { title, author, ISBN, publicationDate, genre, copies } = req.body;

    if (!title || !author || !ISBN || !publicationDate || !genre || !copies) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing!"));
    }

    const book = new Book({
      title,
      author,
      ISBN,
      publicationDate,
      genre,
      copies,
    });

    await book.save();
    res
      .status(201)
      .send(new ApiResponse(201, book, "Book created successfully!"));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Failed to create book!"));
  }
};

export { addBook };
