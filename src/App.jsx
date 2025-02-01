// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import Library from './components/library';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [library, setLibrary] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedBook, setSelectedBook] = useState(null);

  // Load library from localStorage on component mount
  useEffect(() => {
    const savedLibrary = JSON.parse(localStorage.getItem('library')) || [];
    setLibrary(savedLibrary);
  }, []);

  // Save library to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('library', JSON.stringify(library));
  }, [library]);

  // Function to add a book to the library (only storing the title)
  const addToLibrary = (book) => {
    // Only add the title and image to the library (no progress or shelf info here)
    if (!library.some((b) => b.id === book.id)) {
      setLibrary([...library, { 
        id: book.id, 
        title: book.volumeInfo.title, 
        image: book.volumeInfo.imageLinks?.thumbnail 
      }]);
    }
  };
  

  // Function to move a book to a different shelf
  const moveBookToShelf = (bookId, shelf) => {
    setLibrary((prevLibrary) =>
      prevLibrary.map((book) =>
        book.id === bookId ? { ...book, shelf } : book
      )
    );
  };

  // Function to update a book's progress
  const updateProgress = (bookId, progress) => {
    setLibrary((prevLibrary) =>
      prevLibrary.map((book) =>
        book.id === bookId ? { ...book, progress } : book
      )
    );
  };

  // Function to open book content (opens the infoLink in a new tab)
  const openBookContent = (book) => {
    if (book.volumeInfo.infoLink) {
      window.open(book.volumeInfo.infoLink, '_blank');
    } else {
      console.log('No story link available for this book');
    }
  };

  return (
    <div className="app">
      <h1>Book Recommendation and Library Organizer</h1>
      <div className="search-bar-container">
        <SearchBar setBooks={setBooks} />
      </div>
      <div className="book-list">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onAddToLibrary={addToLibrary}
            onUpdateProgress={updateProgress}
            onClick={() => openBookContent(book)} // Clicking the book opens the story
          />
        ))}
      </div>
      <Library library={library} moveBookToShelf={moveBookToShelf} />
    </div>
  );
};

export default App;
