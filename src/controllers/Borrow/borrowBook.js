import { Book } from "../../model/book.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Borrow } from "../../model/borrow.model.js";

const borrowBook = async (req, res) => {
  try {
    const { id } = req.params;
    const {borrowedDate} = req.body

    if (!id) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required Fields missing"));
    }

    
    const book = await Book.findById(id);
    if (!book || book.copies<=book.borrowed) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "Book with provided ID does not exist!"));
    }
    const borrow = await Borrow.create({
      user: req.user._id,
      book: id,
      borrowedDate: borrowedDate,
    });

    await borrow.save();

    book.borrowed = (book.borrowed || 0) + 1;
    await book.save();

    res
      .status(200)
      .send(new ApiResponse(200, null, "Book borrowed successfully!"));
    

   
 
   


  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Failed!"));
  }
};

export { borrowBook };
