import { db, auth } from "../firebase";
import { doc, deleteDoc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Book = ({ book, setBooks }) => {
    const [ currentBook, setCurrentBook ] = useState({...book});

    const deleteBook = async (e) => {
        await getDoc(doc(db, "users", auth.currentUser.uid))
        .then(data => {
            let books = [...data.data().books];
            let updatedBooks = [];

            books.forEach(element => {
                if(element.id !== e.target.parentElement.parentElement.id){
                    updatedBooks.push(element);
                }
            })
            
            setBooks(updatedBooks);

            updateDoc(doc(db, "users", auth.currentUser.uid), {
                books: updatedBooks,
            });
        })
        .catch(err => console.log(err));
    }

    const readBook = async (e) => {
        await getDoc(doc(db, "users", auth.currentUser.uid))
        .then(data => {
            let books = [...data.data().books];

            for(let i = 0; i < books.length; i++){
                if(books[i].id === e.target.parentElement.parentElement.id){
                    books[i].read = true;
                }   
            }
            
            setBooks(books);

            updateDoc(doc(db, "users", auth.currentUser.uid), {
                books: books,
            });

            setCurrentBook({...currentBook, read: true})
        })
        .catch(err => console.log(err));
    }

    return (
        <>
        { currentBook ? 
            <div id={currentBook.id} className="book">
                <h2>{currentBook.title}</h2>
                <small>{currentBook.author}</small>
                <h3>{currentBook.numPages} pages</h3>
                <div>
                    <button className={`${currentBook.read ? "has-read" : "btn-read"}`} onClick={readBook}>Read</button>
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