import express from "express";
import { indexRouter } from "./routes/index.route.js";
import { corsOptions } from "./config/cors.config.js";
import cors from "cors";
import { ApiResponse } from "./utils/ApiResponse.js";

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.use("/*", (req, res, next) => {
  return res
    .status(404)
    .send(new ApiResponse(404, null, "No such route exists"));
  next();
});

export { app };
