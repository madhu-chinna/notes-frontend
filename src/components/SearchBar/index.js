import React from 'react';
import './index.css';

const SearchBar = ({ search, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title or category"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
