import React from 'react';
import TodoItem from '../TodoItem';
import './styles/index.scss';

class ToDosList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render () {
        const {
            todos,
            type,
            toDoCheck,
            editTodo,
            removeTodo,
            handleTodoUpdate,
            updateDone,
            markAsPriority,
        } = this.props;

        return (
            <div>
                <ul className="todo-list-items">
                    {todos.map((todo, index) => <TodoItem
                            todo={todo}
                            type={type}
                            index={index}
                            toDoCheck={toDoCheck}
                            editTodo={editTodo}
                            key={todo.desc}
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
}

export default ToDosList;