import React from 'react';
import './styles/index.scss';

const SearchItem = ({handleChange, value}) => {
    return (
        <div className="search-item">
            <input type="text" onChange={handleChange} value={value} placeholder="Search..." />
        </div>
    )
}

export default SearchItem;
