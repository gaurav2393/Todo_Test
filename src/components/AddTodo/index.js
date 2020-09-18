import React from 'react';
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

export default AddTodo;
