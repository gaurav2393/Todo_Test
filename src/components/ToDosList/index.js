import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem';
import './styles/index.scss';

const ToDosList = (props) => {
    const {
        todos,
        type,
        toDoCheck,
        editTodo,
        removeTodo,
        handleTodoUpdate,
        updateDone,
        markAsPriority,
    } = props;

    return (
        <div>
            <ul className="todo-list-items">
                {todos.map((todo, index) => <TodoItem
                        todo={todo}
                        type={type}
                        index={index}
                        toDoCheck={toDoCheck}
                        editTodo={editTodo}
                        removeTodo={removeTodo}
                        handleTodoUpdate={handleTodoUpdate}
                        updateDone={updateDone}
                        markAsPriority={markAsPriority}
                    />
                )}
            </ul>
        </div>
    )
}

ToDosList.propTypes  = {
    todos: PropTypes.instanceOf(Array),
    type: PropTypes.string,
    index: PropTypes.number,
    toDoCheck: PropTypes.func,
    editTodo: PropTypes.func,
    removeTodo: PropTypes.func,
    handleTodoUpdate: PropTypes.func,
    updateDone: PropTypes.func,
    markAsPriority: PropTypes.func,
}

ToDosList.defaultProps = {
    todo: [],
    type: '',
    toDoCheck: () => {},
    editTodo: () => {},
    removeTodo: () => {},
    handleTodoUpdate: () => {},
    updateDone: () => {},
    markAsPriority: () => {},
}


export default ToDosList;