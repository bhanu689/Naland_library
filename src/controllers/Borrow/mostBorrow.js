import { Borrow } from "../../model/borrow.model.js";

import { ApiResponse } from "../../utils/ApiResponse.js";

const getMostBorrowedBooks = async (req, res) => {
  try {
    const mostBorrowedBooks = await Borrow.aggregate([
      { $group: { _id: '$book', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    
    ]);

    if (!mostBorrowedBooks.length) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "No borrowed books found!"));
    }

    res
      .status(200)
      .send(new ApiResponse(200, mostBorrowedBooks, "Most borrowed books retrieved successfully!"));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to retrieve most borrowed books!"));
  }
};

export { getMostBorrowedBooks };
