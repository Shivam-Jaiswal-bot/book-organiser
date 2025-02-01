// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const SearchBar = ({ setBooks }) => {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');

  const searchBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}+subject:${genre}`
      );
      setBooks(response.data.items);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
      />
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">All Genres</option>
        <option value="fiction">Fiction</option>
        <option value="science">Science</option>
        <option value="fantasy">Fantasy</option>
      </select>
      <button onClick={searchBooks}>Search</button>
    </div>
  );
};

export default SearchBar;