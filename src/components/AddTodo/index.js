import React from 'react';
import PropTypes from 'prop-types';
import './styles/index.scss';

const AddTodo = ({
        handleChange,
        value,
        handleSubmit,
        handleCurrentTimeChange,
        currentToDoTime,
    }) => {
    return (
        <div className="add-todo-container">
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={value} required placeholder="Add text here..." />
                <input type="datetime-local" onChange={handleCurrentTimeChange} value={currentToDoTime} required />
                <input type="submit" value='Add Task' className="add-button" />
            </form>
        </div>
    )
}

AddTodo.propTypes  = {
    handleChange: PropTypes.func,
    value: PropTypes.string,
    handleSubmit: PropTypes.func,
    handleCurrentTimeChange: PropTypes.func,
    currentToDoTime: PropTypes.string,
}

AddTodo.defaultProps = {
    handleChange: () => {},
    value: '',
    handleSubmit: () => {},
    handleCurrentTimeChange: () => {},
    currentToDoTime: '',
}

export default AddTodo;
