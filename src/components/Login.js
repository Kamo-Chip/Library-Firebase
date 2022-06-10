import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [ user, setUser ] = useState({
        email: "",
        password: "",
        loading: false,
        error: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value});
    }

    const signIn = async (e) => {
        e.preventDefault();

        await signInWithEmailAndPassword(auth, user.email, user.password)
        .catch(err => setUser({...user, error: err.message}));

        navigate("/library");
    }
    
    return (
        <form onSubmit={signIn} className="login">
            <h2>Login</h2>
            <section>
                <label>Email:</label>
                <input type="email" name="email" onChange={handleChange} value={user.email} required={true}/>
            </section>
            <section>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" onChange={handleChange} value={user.password} required={true}/>
            </section>
            <button>Login</button>
            { user.error ? <p>{user.error}</p> : null}
        </form>
    )
}

export default Login;