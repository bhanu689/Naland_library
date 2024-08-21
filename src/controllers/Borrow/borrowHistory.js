import { Borrow } from "../../model/borrow.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getBorrowingHistory = async (req, res) => {
  try {
    const history = await Borrow.find({ user: req.user._id }).populate('book');

    if (!history.length) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "No borrowing history found!"));
    }

    res
      .status(200)
      .send(new ApiResponse(200, history, "Borrowing history retrieved successfully!"));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to retrieve borrowing history!"));
  }
};

export { getBorrowingHistory };
