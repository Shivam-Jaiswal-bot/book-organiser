/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import BookCard from './BookCard';

const Library = ({ library, moveBookToShelf }) => {
  const shelves = {
    toRead: library.filter((book) => book.shelf === 'toRead'),
    reading: library.filter((book) => book.shelf === 'reading'),
    completed: library.filter((book) => book.shelf === 'completed'),
  };

  return (
    <div className="library">
      <h2>My Library</h2>
      <div className="shelves">
        <div className="shelf">
          <h3>To Read</h3>
          {shelves.toRead.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        <div className="shelf">
          <h3>Reading</h3>
          {shelves.reading.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        <div className="shelf">
          <h3>Completed</h3>
          {shelves.completed.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;