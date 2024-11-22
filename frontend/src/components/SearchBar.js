import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                className="search-input"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a location..."
            />
            <button className='search-button' onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
