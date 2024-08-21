import { ApiResponse } from "../../utils/ApiResponse.js";

const listBook = async (req, res) => {
  try {
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