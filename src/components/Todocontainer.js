import React from "react";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { v4 as uuidv4 } from "uuid";

class TodoContainer extends React.Component {
    state = {
        todos: []
       };

    handleChange = id => {
        this.setState(prevState => ({
            todos: prevState.todos.map(todo => {
                if (todo.id === id){
                    todo.completed = !todo.completed
                }
                return todo
            })
        }))
    }

    delTodo = id => {
        this.setState({
            todos: [
                ...this.state.todos.filter(todo => {
                    return todo.id !== id;
                })
            ]
        })
    }

    addTodo = title => {
        const todo = {
            id: uuidv4(),
            title: title,
            completed: false
        }
        
        this.setState({
            todos: [...this.state.todos, todo]
        })
    }

    updateTodo = (updatedTitle, id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id){
                    todo.title = updatedTitle
                }
                return todo;
            })
        })
    }

    componentDidMount() {
        const todos = JSON.parse(localStorage.getItem("todos"))
        if(todos){
            this.setState({todos: todos})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.todos != this.state.todos) {
            localStorage.setItem('todos', JSON.stringify(this.state.todos))
        }
    }

    render() {
        return (
            <div className="container">
                <div className="inner">
                    <Header />
                    <InputTodo addTodoProps={this.addTodo}/>
                    <TodosList todos={this.state.todos} handleChangeProbs={this.handleChange} deleteTodoProps={this.delTodo} updateTodo={this.updateTodo}/>
                </div>
            </div>
        )
    }
}

export default TodoContainer