import { Borrow } from "../../model/borrow.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getActiveMembers = async (req, res) => {
  try {
    const activeMembers = await Borrow.aggregate([
      { $group: { _id: '$user', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      
    ]);

    if (!activeMembers.length) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "No active members found!"));
    }

    res
      .status(200)
      .send(new ApiResponse(200, activeMembers, "Most active members retrieved successfully!"));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to retrieve active members!"));
  }
};

export { getActiveMembers };
