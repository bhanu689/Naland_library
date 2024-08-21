import { addBook } from "./Book/addBook.js";
import { deleteBook } from "./Book/deleteBook.js";
import { listBook } from "./Book/listBook.js";
import { updateBook } from "./Book/updateBook.js";

const bookController = {
  add: addBook,
  get: listBook,
  update: updateBook,
  delete: deleteBook,
};

export { bookController };
