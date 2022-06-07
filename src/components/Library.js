import Book from "./Book";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

const Library = ({books, setBooks }) => {
    const getBooks = async () => {
        await getDocs(collection(db, "books"))
        .then(docs => {
            let books = [];
            docs.forEach(doc => {
                books.push(doc.data());
            });
            setBooks(books);
        });
    }

    useEffect(() => {
        getBooks();
    }, []);

    const sortByAuthor = async () => {
        const q = await query(collection(db, "books"), orderBy("author", "asc"));
        
        await getDocs(q)
        .then(data => {
            let sortedBooks = [];
            data.forEach(d => {
                sortedBooks.push(d.data());
            });
            setBooks(sortedBooks);
        })
    }

    const sortByTitle = async () => {
        const q = await query(collection(db, "books"), orderBy("title", "asc"));

        await getDocs(q)
        .then(doc => {
            let sortedBooks = [];
            doc.forEach(d => {
                sortedBooks.push(d);
            });
            setBooks(sortedBooks);
        })
    }
    
    return (
        <section className="library-container">
            <div className="sort-container">
                <h2>Sort By</h2>
                <button className="btn-sort" onClick={sortByTitle}>Title</button>
                <button className="btn-sort" onClick={sortByAuthor}>Author</button>
            </div>
            <div className={`${books.length ? "books-container" : ""}`}>
                {!books.length ? <p>Add some books</p> : books.map((book) => <Book key={book.id} book={book} setBooks={setBooks} books={books}/>)}
            </div>
            <Link to="/form"><button className="btn-add">Add Book</button></Link>
        </section>
    )
}

export default Library;