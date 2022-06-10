import Book from "./Book";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { getDoc , doc } from "firebase/firestore";
import { useEffect } from "react";

const Library = ({books, setBooks }) => {
    const { currentUser } = auth;
    const getBooks = async () => {
        await getDoc(doc(db, "users", currentUser.uid))
        .then(docs => {
            setBooks(docs.data().books);
        })
    }

    useEffect(() => {
        getBooks();
    }, []);

    useEffect(() => {
    }, [books]);

    const sortByAuthor = () => {
        if(books.length === 0){
            return;
        }
        let booksToSort = [...books];
        
        for(let i = 0; i < booksToSort.length; i++){
            for(let j = i; j < booksToSort.length; j++){
                if((booksToSort[i].author).localeCompare(booksToSort[j].author) > 0) {
                    let temp = booksToSort[i];
                    booksToSort[i] = booksToSort[j];
                    booksToSort[j] = temp;
                }
            }
        }
        setBooks(booksToSort);
    }

    const sortByTitle = () => {
        if(books.length === 0){
            return;
        }
        let booksToSort = [...books];

        for(let i = 0; i < booksToSort.length; i++){
            for(let j = i; j < booksToSort.length; j++){
                if(((booksToSort[i].title).localeCompare(booksToSort[j].title)) > 0) {
                    let temp = booksToSort[i];
                    booksToSort[i] = booksToSort[j];
                    booksToSort[j] = temp;
                }
            }
        }
        setBooks(booksToSort);
    }
    
    return (
        <section className="library-container">
            <div className="sort-container">
                <h2>Sort By</h2>
                <div className="sort-btn-container">
                    <button className="btn-sort" onClick={sortByTitle}>Title</button>
                    <button className="btn-sort" onClick={sortByAuthor}>Author</button>
                </div>
            </div>
            <div className={`${books.length ? "books-container" : ""}`}>
                {!books.length ? <p>Add some books</p> : books.map((book) => <Book key={book.id} book={book} setBooks={setBooks}/>)}
            </div>
            <Link to="/form"><button className="btn-add">Add Book</button></Link>
        </section>
    )
}

export default Library;