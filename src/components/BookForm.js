import { useNavigate} from "react-router-dom";
import { useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const BookForm = () => {

    const [ loading, setLoading ] = useState(false);

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

        await getDoc(doc(db, "users", auth.currentUser.uid))
        .then(data => {
            let currentBooks = [...data.data().books];
            currentBooks.push({
                title: capitalise(e.target.title.value),
                author: capitalise(e.target.author.value),
                numPages: e.target.numPages.value,
                id: (auth.currentUser.uid).concat(currentBooks.length),
                read: false,
            });

            updateDoc(doc(db, "users", auth.currentUser.uid), {
                books: currentBooks,
            });
        })
        .catch(err => console.log(err));

        navigate("/library");
    }

    return (
        <form onSubmit={handleSubmit} className="book-form">
            <h2>Enter book details</h2>
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