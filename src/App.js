import './App.css';
import Library from "./components/Library";
import Header from "./components/Header";
import BookForm from "./components/BookForm";
import Register from "./components/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useEffect, useState, useContext,} from 'react';
import Login from './components/Login';
import { db } from "./firebase";
import { addDoc, collection } from 'firebase/firestore';

function App() {
  const [ books, setBooks ] = useState([]);

  const updateLibrary = (newLibrary) => {
    setBooks(newLibrary);
  }

  useEffect(() => {
  }, [books]);

  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/library" element={<Library books={books} setBooks={updateLibrary}/>}/>
          <Route path="/form" element={<BookForm books={books} setBooks={updateLibrary}/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
