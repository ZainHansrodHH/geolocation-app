import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';
import axios from 'axios';

const Home = () => {
    const [results, setResults] = useState([]);

    const handleSearch = async (query) => {
        const response = await axios.get(`http://localhost:5000/search?q=${query}`);
        setResults(response.data.suggestions);
    };

    return (
        <div>
            <h1>Geolocation Search</h1>
            <SearchBar onSearch={handleSearch} />
            <ResultsList results={results} />
        </div>
    );
};

export default Home;
