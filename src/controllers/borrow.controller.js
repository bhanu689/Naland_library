
import { getActiveMembers } from "./Borrow/activeMember.js";
import { getBookAvailability } from "./Borrow/bookAvailable.js";
import { borrowBook } from "./Borrow/borrowBook.js";
import { getBorrowingHistory } from "./Borrow/borrowHistory.js";
import { getMostBorrowedBooks } from "./Borrow/mostBorrow.js";
import { returnBook } from "./Borrow/returnBook.js";




const borrowController = {
    activeMember : getActiveMembers,
    bookAvailable : getBookAvailability,
    borrowBook : borrowBook,
    borrowHistory : getBorrowingHistory,
    mostBorrow : getMostBorrowedBooks,
    returnBook : returnBook
}

export {borrowController}