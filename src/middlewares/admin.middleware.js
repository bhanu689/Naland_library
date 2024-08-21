import { ApiResponse } from "../utils/ApiResponse.js";

const admin = (req, res, next) => {
  const Admin = req.user;
  if (Admin) {
    console.log(req.user);
    next();
  } else {
    //console.log(req.user);
    res.status(403).send(new ApiResponse(403, null, "Admin Access Required"));
  }
};

export { admin };
