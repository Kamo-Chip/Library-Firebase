import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc, addDoc, getDocs, updateDoc } from "firebase/firestore";

const BookForm = ({books, setBooks }) => {

    const [ loading, setLoading ] = useState(false);

    useState(() => {
    
    }, [books]);

    const navigate = useNavigate();

    const capitalise = (value) => {
        let newValue = "";

        for(let i = 0; i < value.length; i++){
            if(i){
                newValue += value[i];
            }else{
                newValue += (value[i].charAt(0).toUpperCase());
            }
        }

        return newValue;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const ref  = await addDoc(collection(db, "books"), {
            title: capitalise(e.target.title.value),
            author: capitalise(e.target.author.value),
            numPages: e.target.numPages.value,
            read: false,
        });

        await updateDoc(doc(db, "books", ref.id), {
            id: ref.id,
        })

        getBooks();

        navigate("/");
    }

    const getBooks = async () => {
        const snapShot = await getDocs(collection(db, "books"));
        let books = [];

        snapShot.forEach((doc) => {
            books.push(doc.data());
        });
        
        setBooks(books);
    }

    return (
        <form onSubmit={handleSubmit} className="book-form">
            <section>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" required={true}/>
            </section>
            <section>
                <label htmlFor="author">Author</label>
                <input type="text" name="author" required={true}/>
            </section>
            <section>
                <label htmlFor="numPages">No. pages</label>
                <input className="input-page" type="number" name="numPages" required={true}/>
            </section>
            {loading ? <p>Loading...</p> : <button>Add</button>}
        </form>
    )
}

export default BookForm