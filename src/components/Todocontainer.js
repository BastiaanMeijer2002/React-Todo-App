import React from "react";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { v4 as uuidv4 } from "uuid";

class TodoContainer extends React.Component {
    state = {
        todos: [
          {
            id: uuidv4(),
            title: "Setup development environment",
            completed: true
          },
          {
            id: uuidv4(),
            title: "Develop website and add content",
            completed: false
          },
          {
            id: uuidv4(),
            title: "Deploy to live server",
            completed: false
          }
        ]
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

    render() {
        return (
            <div>
                <Header />
                <InputTodo addTodoProps={this.addTodo}/>
                <TodosList todos={this.state.todos} handleChangeProbs={this.handleChange} deleteTodoProps={this.delTodo}/>
            </div>
        )
    }
}

export default TodoContainer