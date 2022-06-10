import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";

const Register = () => {

    const [ user, setUser ] = useState({
        email: "",
        password: "",
    });

    const [ registerDetails, setRegisterDetails ] = useState({
        loading: false,
        error: null,
    })

    const navigate = useNavigate();
    
    const createAccount = async (e) => {
        setRegisterDetails({...registerDetails, error: null});
        e.preventDefault();
        
        setRegisterDetails({...registerDetails, loading: true});

        setUser({email: e.target.email.value, password: e.target.password.value})

        await createUserWithEmailAndPassword(auth, user.email, user.password)
        .catch(err => {
            setRegisterDetails({...registerDetails, error: err.message})
            return;
        });
        
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            ...user,
            books: [],
        })
        navigate("/library");
    }

    const handleChange = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value});
    }

    return (
        <form onSubmit={createAccount} className="register">
            <h2>Register account</h2>
            <section>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" onChange={handleChange} value={user.email} required={true}/>
            </section>
            <section>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" onChange={handleChange} value={user.password} required={true}/>
            </section>
            <button disabled={registerDetails.loading}>{registerDetails.loading ? "Loading..." : "Create Account"}</button>
            <Link to="/login"><p>Already have an account?</p></Link>
            { registerDetails.error ? <p>{registerDetails.error}</p> : null }
        </form>
    )
}

export default Register;