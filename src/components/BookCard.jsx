/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const BookCard = ({ book, onAddToLibrary, onUpdateProgress, onClick }) => {
  const { title, authors, imageLinks, description } = book.volumeInfo;
  const [progress, setProgress] = useState(book.progress || 0);

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    setProgress(newProgress);
    onUpdateProgress(book.id, newProgress);
  };

  // Handle Add to Library click event, preventing book content opening
  const handleAddToLibrary = (e) => {
    e.preventDefault(); // Prevent default behavior (especially page refresh)
    e.stopPropagation(); // Prevent the onClick for the book card from firing
    onAddToLibrary(book);
  };

  return (
    <div className="book-card" onClick={onClick}>
      <img src={imageLinks?.thumbnail} alt={title} />
      <div className="book-card-content">
        <h3>{title}</h3>
        <p>{authors?.join(', ')}</p>
        <p>{description?.substring(0, 100)}...</p>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
        />
        <span>{progress}%</span>
        <button onClick={handleAddToLibrary}>Add to Library</button>
      </div>
    </div>
  );
};

export default BookCard;
