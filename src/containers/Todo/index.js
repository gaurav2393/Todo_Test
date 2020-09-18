import React, { Fragment } from 'react';
import _ from 'lodash';
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
        const newToDoList = [
            {
                desc: newTodoText,
                isEditMode: false,
                date: new Date(currentToDoTime),
                priority: 2
            }
        ].concat(_.cloneDeep(currentTodos));
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

    toDoCheck = (index, type) => {
        const { currentTodos, doneTodos } = this.state;
        let selectedTodo;
        if (type==='todo') {
            selectedTodo = Object.assign({}, currentTodos[index]);
            const newToDoList = [].concat(_.cloneDeep(currentTodos));
            newToDoList.splice(index, 1);
            const newDoneTodos = _.cloneDeep(doneTodos);
            newDoneTodos.push(selectedTodo)
            this.setState({
                currentTodos: newToDoList,
                doneTodos: newDoneTodos,
            })
        } else {
            selectedTodo = Object.assign({}, doneTodos[index]);
            const newDoneTodos = _.cloneDeep(doneTodos);
            newDoneTodos.splice(index, 1);
            const newToDoList = _.cloneDeep(currentTodos);
            if (selectedTodo.priority === 1) {
                newToDoList.unshift(selectedTodo);
            } else {
                newToDoList.push(selectedTodo);
            }
            this.setState({
                currentTodos: newToDoList,
                doneTodos: newDoneTodos,
            })
        }
    }

    removeTodo = (index, type) => {
        const { currentTodos, doneTodos } = this.state;
        let selectedTodo;
        if (type==='todo') {
            selectedTodo = Object.assign({}, currentTodos[index]);
            const newToDoList = [].concat(_.cloneDeep(currentTodos));
            newToDoList.splice(index, 1);
            this.setState({
                currentTodos: newToDoList,
            })
        } else {
            selectedTodo = Object.assign({}, doneTodos[index]);
            const newDoneTodos = _.cloneDeep(doneTodos);
            newDoneTodos.splice(index, 1);
            this.setState({
                doneTodos: newDoneTodos,
            })
        }
    }

    markAllDone = () => {
        const { currentTodos, doneTodos } = this.state;
        const newDoneTodos = _.cloneDeep(doneTodos);
        const newCurrentTodos = _.cloneDeep(currentTodos);
        this.setState({
            currentTodos: [],
            doneTodos: newDoneTodos.concat(newCurrentTodos),
        })
    }

    editTodo = (index) => {
        const { currentTodos } = this.state;
        const newCurrentTodos = _.cloneDeep(currentTodos);
        newCurrentTodos[index].isEditMode = true;
        this.setState({
            currentTodos: newCurrentTodos,
        })
    }

    updateDone = (index) => {
        const { currentTodos } = this.state;
        const newCurrentTodos = _.cloneDeep(currentTodos);
        newCurrentTodos[index].isEditMode = false;
        this.setState({
            currentTodos: newCurrentTodos,
        })
    }

    handleTodoUpdate = (event, index) => {
        const { currentTodos } = this.state;
        const newCurrentTodos = _.cloneDeep(currentTodos);
        if (event && event.target) {
            newCurrentTodos[index].desc = event.target.value;
        }
        this.setState({
            currentTodos: newCurrentTodos,
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
        const newCurrentTodos = _.cloneDeep(currentTodos);
        newCurrentTodos[index].priority = newCurrentTodos[index].priority===1 ? 2 : 1;
        const selectedTodo = newCurrentTodos[index];
        newCurrentTodos.splice(index, 1);
        if (selectedTodo.priority === 1) {
            newCurrentTodos.unshift(selectedTodo)
        } else {
            newCurrentTodos.push(selectedTodo);
        }
        this.setState({
            currentTodos: newCurrentTodos,
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
