import { db } from "../firebase";
import { doc, deleteDoc, getDocs, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";

const Book = ({ book, books, setBooks }) => {
    const [ currentBook, setCurrentBook ] = useState({...book});

    const deleteBook = async () => {
        await deleteDoc(doc(db, "books", book.id));
        setCurrentBook(null);

        const docs = await getDocs(collection(db, "books"))
        let updatedBooks = []
        docs.forEach((book) => {
            updatedBooks.push(book.data());
        });
        
        setBooks(updatedBooks);
    }

    const readBook = async () => {
        await updateDoc(doc(db, "books", book.id), {
            read: true,
        });
    }

    return (
        <>
        { currentBook ? 
            <div className="book">
                <h2>{currentBook.title}</h2>
                <small>{currentBook.author}</small>
                <h1>{currentBook.numPages} pages</h1>
                <div>
                    <button className="btn-read" onClick={readBook}>Read</button>
                    <button className="btn-remove" onClick={deleteBook}>Remove</button>
                </div>
            </div>
            :
            null
        }
            
        </>
    )
}

export default Book;