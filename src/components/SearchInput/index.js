import React from 'react';
import PropTypes from 'prop-types';
import './styles/index.scss';

const SearchItem = ({handleChange, value}) => {
    return (
        <div className="search-item">
            <input type="text" onChange={handleChange} value={value} placeholder="Search..." />
        </div>
    )
}

SearchItem.propTypes  = {
    handleChange: PropTypes.func,
    value: PropTypes.string,
}

SearchItem.defaultProps = {
    handleChange: () => {},
    value: '',
}

export default SearchItem;
