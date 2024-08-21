import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { bookController } from "../controllers/book.controller.js";
import { admin } from "../middlewares/admin.middleware.js";
import { getPaginated } from "../middlewares/pagination.middleware.js";
import { Book } from "../model/book.model.js";

const bookRouter = express.Router();

bookRouter
  .route("/")
  .post(checkAuth, admin, bookController.add)
  .get(checkAuth, getPaginated(Book), bookController.get);

bookRouter
  .route("/:id")
  .put(checkAuth, admin, bookController.update)
  .delete(checkAuth, admin, bookController.delete);

export { bookRouter };
