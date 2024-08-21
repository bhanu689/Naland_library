import { Book } from "../../model/book.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const listBook = async (req, res) => {
  try {
    const filter = req.query.genre ? { genre: req.query.genre } : {};

    const books = await Book.find(filter);

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          { Books: res.paginated },
          "Book fetch successfully!"
        )
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, null, "Failed to fetch book!"));
  }
};

export { listBook };
