import React, { Fragment } from 'react';
import { monthsArray } from '../utils/constants';
import './styles/index.scss';

const TodoItem = (props) => {
    const { todo, type, index, toDoCheck, editTodo, removeTodo, handleTodoUpdate, updateDone, markAsPriority = () => {} } = props;
    let deadline = 3;
    let currentDate = new Date();
    if (todo.date && todo.date.getTime() - currentDate.getTime() < 24 * 60 * 60 * 1000) {
        deadline = 1;
    } else if (todo.date && todo.date.getTime() - currentDate.getTime() < 48 * 60 * 60 * 1000) {
        deadline = 2;
    }
    const todoDate=todo.date;
    const dateToShow = `${todoDate.getDate()}-${monthsArray[todoDate.getMonth()]}-${todoDate.getFullYear()} ${todoDate.getHours()}:${todoDate.getMinutes()}`;
    return (
        <li className="list-item-container">
            <div className={`list-item todo-deadline-${deadline} ${type==='done' ? 'done-item': ''}`}>
                {todo.isEditMode ?
                    <Fragment>
                        <input type="text" className="update-todo-desc" value={todo.desc} onChange={() => handleTodoUpdate(event, index) } />
                        <span className="image-span edit-done" onClick={() => updateDone(index)}></span>
                    </Fragment>
                    : <Fragment>
                        <div className="todo-checkbox">
                            <input type="checkbox" onClick={() => toDoCheck(index, type)} checked={type==='done'} onChange={() => toDoCheck(index, type)} />
                        </div>
                        <div className="todo-description-container">
                            <span className="description">{todo.desc}</span>
                            <span className="todo-date">{dateToShow}</span>
                            <span className="image-span edit-item" onClick={() => editTodo(index)}></span>
                            <span className="image-span delete-item" onClick={() => removeTodo(index, type)}></span>
                        </div>
                    </Fragment>
                }
            </div>
            <div className="priority">
                {todo.priority===1 ? (
                    <span className="high-priority" onClick={() => markAsPriority(index)}></span>
                ) : (
                    <span className="low-priority" onClick={() => markAsPriority(index)}></span>
                )}
            </div>
        </li>
    )
}

export default TodoItem;
