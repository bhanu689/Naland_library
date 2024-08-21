import { Book } from "../../model/book.model.js";
import { Borrow } from "../../model/borrow.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const returnBook = async (req, res) => {
  try {
    const { id } = req.params;

    const { returnedDate } = req.body;

    if (!id) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required Fields missing"));
    }

    const borrow = await Borrow.findById(id).populate("book");

    if (!borrow) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "Borrow record not found!"));
    }

    const returned = await Borrow.create({
      returnedDate,
    });

    await returned.save();

    const book = borrow.book;

    book.borrowed = book.borrowed > 0 ? book.borrowed - 1 : 0;
    await book.save();

    res
      .status(200)
      .send(new ApiResponse(200, null, "Book returned successfully!"));
  } catch (error) {
  console.log(error);
  res.status(500).send(new ApiResponse(500, error, "Failed!"));
}
};

export { returnBook };