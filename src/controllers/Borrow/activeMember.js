import { Borrow } from "../../model/borrow.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getActiveMembers = async (req, res) => {
  try {
    const userReport = await Borrow.aggregate([
      { $group: { _id: "$user", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res
      .status(200)
      .send(
        new ApiResponse(200, userReport, "Active members fetch successfully!")
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Failed!"));
  }
};


export { getActiveMembers };
