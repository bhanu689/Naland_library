import express from "express";
import { userRouter } from "./user.route.js";
import { authRouter } from "./auth.route.js";
import { bookRouter } from "./book.route.js";
import { borrowRouter } from "./borrow.route.js";

const indexRouter = express.Router();

indexRouter.use("/api/v1/user", userRouter);
indexRouter.use("/api/v1/auth", authRouter);
indexRouter.use("/api/v1/book", bookRouter);
indexRouter.use("/api/v1/borrow", borrowRouter);

export { indexRouter };
