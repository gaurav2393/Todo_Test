import React, { Fragment } from 'react';
import ToDosList from '../../components/ToDosList';
import SearchInput from '../../components/SearchInput';
import AddTodo from '../../components/AddTodo';
import './styles/index.scss';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTodos: [
                {
                    desc: "Complete Info edge assignment",
                    isEditMode: false,
                    date: new Date(new Date().getTime() + 1000000000),
                    priority: 1,
                },
                {
                    desc: "Pay the rent",
                    isEditMode: false,
                    date: new Date(),
                    priority: 1,
                },
                {
                    desc: "Go for a walk",
                    isEditMode: false,
                    date: new Date(new Date().getTime() + 92999900),
                    priority: 2,
                }
            ],
            doneTodos: [
                {
                    desc: "Play Football",
                    isEditMode: false,
                    date: new Date(),
                    priority: 2
                }
                
            ],
            searchText: "",
            newTodoText: "",
            currentToDoTime: ""
        }
    }

    handleSearchTextChange = (event) => {
        if (event && event.target) {
            this.setState({
                searchText: event.target.value,
            })
        }
    }

    addNewTodo = (event) => {
        event.preventDefault();
        const { currentTodos, newTodoText, currentToDoTime} = this.state;
        const newToDoList = currentTodos.concat([
            {
                desc: newTodoText,
                isEditMode: false,
                date: new Date(currentToDoTime),
                priority: 2
            }
        ]);
        this.setState({
            currentTodos: newToDoList,
            newTodoText: "",
            currentToDoTime: "",
        })
    }

    handleNewTodoText = (event) => {
        if (event && event.target) {
            this.setState({
                newTodoText: event.target.value,
            })
        }
    }

    toDoCheck = (event, index, type) => {
        event.stopPropagation();
        const { currentTodos, doneTodos } = this.state;
        let selectedTodo;
        if (type==='todo') {
            selectedTodo = Object.assign({}, currentTodos[index]);
            currentTodos.splice(index, 1);
            doneTodos.push(selectedTodo)
            this.setState({
                currentTodos,
                doneTodos,
            })
        } else {
            selectedTodo = Object.assign({}, doneTodos[index]);
            doneTodos.splice(index, 1);
            if (selectedTodo.priority === 1) {
                currentTodos.unshift(selectedTodo);
            } else {
                currentTodos.push(selectedTodo);
            }
            this.setState({
                currentTodos,
                doneTodos,
            })
        }
    }

    removeTodo = (index, type) => {
        const { currentTodos, doneTodos } = this.state;
        let selectedTodo;
        if (type==='todo') {
            selectedTodo = Object.assign({}, currentTodos[index]);
            currentTodos.splice(index, 1);
            this.setState({
                currentTodos,
            })
        } else {
            selectedTodo = Object.assign({}, doneTodos[index]);
            doneTodos.splice(index, 1);
            this.setState({
                doneTodos,
            })
        }
    }

    markAllDone = () => {
        const { currentTodos, doneTodos } = this.state;
        this.setState({
            currentTodos: [],
            doneTodos: doneTodos.concat(currentTodos),
        })
    }

    editTodo = (index) => {
        const { currentTodos } = this.state;
        currentTodos[index].isEditMode = true;
        this.setState({
            currentTodos,
        })
    }

    updateDone = (index) => {
        const { currentTodos } = this.state;
        currentTodos[index].isEditMode = false;
        this.setState({
            currentTodos,
        })
    }

    handleTodoUpdate = (event, index) => {
        const { currentTodos } = this.state;
        if (event && event.target) {
            currentTodos[index].desc = event.target.value;
        }
        this.setState({
            currentTodos,
        })
    }

    handleCurrentTimeChange = (event) => {
        if (event && event.target) {
            this.setState({
                currentToDoTime: event.target.value,
            })
        }
    }

    filterTodos = (todos = [], text = '') => {
        return todos.filter(todo => todo.desc.toLowerCase().indexOf(text.toLowerCase()) > -1 )
    }

    markAsPriority = (index) => {
        const { currentTodos } = this.state;
        currentTodos[index].priority = currentTodos[index].priority===1 ? 2 : 1;
        const selectedTodo = currentTodos[index];
        currentTodos.splice(index, 1);
        if (selectedTodo.priority === 1) {
            currentTodos.unshift(selectedTodo)
        } else {
            currentTodos.push(selectedTodo);
        }
        this.setState({
            currentTodos,
        })
    }

    render () {
        const { currentTodos, searchText, newTodoText, doneTodos, currentToDoTime } = this.state;
        let filteredCurrentTodos = currentTodos;
        let filteredDoneTodos = doneTodos;
        if (searchText) {
            filteredCurrentTodos = this.filterTodos(filteredCurrentTodos, searchText);
            filteredDoneTodos = this.filterTodos(filteredDoneTodos, searchText);
        }

        return (
            <div className="main-container">
                <h1>
                    To do list
                </h1>
                <AddTodo
                    handleChange={this.handleNewTodoText}
                    value={newTodoText}
                    handleSubmit={this.addNewTodo}
                    buttonText="Add Task"
                    handleCurrentTimeChange={this.handleCurrentTimeChange}
                    currentToDoTime={currentToDoTime}
                />
                <SearchInput
                    handleChange={this.handleSearchTextChange}
                    value={searchText}
                />
                {filteredCurrentTodos.length ?
                    <Fragment>
                        <div className="mark-all-done">
                            <div className="mark-done-checkbox">
                                <input type="checkbox" onClick={this.markAllDone} />
                            </div>
                            <p>
                                Mark all as done.
                            </p>
                        </div>
                        <ToDosList
                            todos={filteredCurrentTodos}
                            editTodo={this.editTodo}
                            type="todo"
                            toDoCheck={this.toDoCheck}
                            removeTodo={this.removeTodo}
                            handleTodoUpdate={this.handleTodoUpdate}
                            updateDone={this.updateDone}
                            markAsPriority={this.markAsPriority}
                        />
                    </Fragment>:
                    null
                }
                {
                    filteredDoneTodos.length ?
                    <Fragment>
                        <p className="done-length">
                            Done: {filteredDoneTodos.length}
                        </p>
                        <ToDosList
                            todos={filteredDoneTodos}
                            editTodo={this.editTodo}
                            type="done"
                            toDoCheck={this.toDoCheck}
                            removeTodo={this.removeTodo}
                            handleTodoUpdate={this.handleTodoUpdate}
                            updateDone={this.updateDone}
                        />
                    </Fragment>
                    : null
                }
            </div>
        )
    }
}

export default Todo;
