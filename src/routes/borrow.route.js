import express from "express"
import { checkAuth } from "../middlewares/auth.middleware.js";
import { borrowController } from "../controllers/borrow.controller.js";


const borrowRouter = express.Router();

borrowRouter.route("/active-members").get(checkAuth,borrowController.activeMember)
borrowRouter.route("/book-availability").get(checkAuth,borrowController.bookAvailable)
borrowRouter.route("/borrow").post(checkAuth,borrowController.borrowBook)
borrowRouter.route("/history").get(checkAuth,borrowController.borrowHistory)
borrowRouter.route("/most-borrowed").get(checkAuth,borrowController.mostBorrow)
borrowRouter.route("/return/:id").put(checkAuth,borrowController.returnBook)

export {borrowRouter}