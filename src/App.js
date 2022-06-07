import './App.css';
import Library from "./components/Library";
import Header from "./components/Header";
import BookForm from "./components/BookForm";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from 'react';
import { updateDoc } from 'firebase/firestore';

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
          <Route path="/" element={<Library books={books} setBooks={updateLibrary}/>}/>
          <Route path="/form" element={<BookForm books={books} setBooks={updateLibrary}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
