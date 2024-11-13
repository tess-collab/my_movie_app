import React, { useState } from 'react';
import { FormControl, Button } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query); // Pass query to parent for handling
  };

  return (
    <div className="d-flex justify-content-center my-3">
      <FormControl
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query on change
      />
      <Button variant="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>Search</Button>
    </div>
  );
}

export default SearchBar;
