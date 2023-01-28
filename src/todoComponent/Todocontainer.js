import React from "react";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { v4 as uuidv4 } from "uuid";
import {Route, Switch, } from "react-router-dom"
import { Navigate } from "react-router-dom";
import MembersComponent from "./membersComponent/MembersComponent";
import {BiLogOut} from 'react-icons/bi'

async function getTodos(token) {
    token = `Bearer ${token}`

    let headers = new Headers()
    headers.append("Authorization", token)
    return fetch("http://localhost:8000/api/get-user",
        {
            method: "GET",
            headers: headers,
        })
        .then(res => res.json())
        .catch(error => {
            console.log(error)
        })
}

async function getTodo(id, token) {
    token = `Bearer ${token}`
    let headers = new Headers()
    headers.append("Authorization", token)


    return fetch(`http://localhost:8000/api/todos/${id.slice(11)}`, {
        method: "GET",
        headers: headers
    }).then(res => res.json())
}

async function uploadTodo(title) {
    const token = `Bearer ${localStorage.getItem("token")}`
    let headers = new Headers()
    headers.append("Authorization", token)
    headers.append("Content-Type", "application/json")

    return fetch("http://localhost:8000/api/todos", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({todo: title, completed: false})
    }).then(res => res.json())
        .then(res => {
            return fetch('http://localhost:8000/api/add-todo-to-user', {
                method: "POST",
                headers: headers,
                body: JSON.stringify({user: localStorage.getItem("id"), todo: res['id']})
            }).then(res => res.json())
        })
}

async function completeTodo(id, state) {
    const token = `Bearer ${localStorage.getItem("token")}`
    let headers = new Headers()
    headers.append("Authorization", token)
    headers.append("Content-Type", "application/json")

     fetch(`http://localhost:8000/api/todos/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({"completed": state})
    }).then(res => res.text())
}

async function updateTodoItem(id, todo) {
    const token = `Bearer ${localStorage.getItem("token")}`
    let headers = new Headers()
    headers.append("Authorization", token)
    headers.append("Content-Type", "application/json")

    fetch(`http://localhost:8000/api/todos/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({"todo": todo})
    }).then(res => res.json())
}

async function deleteTodoItem(id) {
    const token = `Bearer ${localStorage.getItem("token")}`
    let headers = new Headers()
    headers.append("Authorization", token)
    headers.append("Content-Type", "application/json")

    fetch(`http://localhost:8000/api/todos/${id}`, {
        method: "DELETE",
        headers: headers,
    }).then(res => res.status)
}



class TodoContainer extends React.Component {
    state = {
        todos: [],
        showMembers: false,
       };

    handleChange = id => {
        this.setState(prevState => ({
            todos: prevState.todos.map( todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                    completeTodo(id, todo.completed).then()
                }
                return todo
            })
        }))

    }

    delTodo = id => {
        deleteTodoItem(id).then()
        this.setState({
            todos: [
                ...this.state.todos.filter(todo => {
                    return todo.id !== id;
                })
            ]
        })
    }

    addTodo = async title => {
        const item = await uploadTodo(title)

        const todo = {
            id: item['id'],
            title: title,
            completed: false
        }

        this.setState({
            todos: [...this.state.todos, todo]
        })
    }

    updateTodo = (updatedTitle, id) => {
        updateTodoItem(id, updatedTitle).then()
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id){
                    todo.title = updatedTitle
                }
                return todo;
            })
        })
    }

    showMembers = todo => {
        this.setState({showMembers: todo})
    }

    async componentDidMount() {
        const token = localStorage.getItem("token")
        if (token) {
            this.setState({token: token})
            const todos = await getTodos(token)
            for (let todosKey in todos['todos']) {
                let todo = await getTodo(todos['todos'][todosKey], token)
                const todoItem = {
                    id: todo['id'],
                    title: todo['todo'],
                    completed: todo['completed'],
                    user: todo['users']
                }
                this.setState({todos: [...this.state.todos, todoItem]})
            }
        }


    }


    render() {
        let token = localStorage.getItem("token")
        let view;

        const logout = () => {
            localStorage.clear()
            return (
                <Navigate to={'login'} />
            )
        }

        if (token){
            view =
                <div>
                    {/*<div onClick={logout} style={{float: "right"}}><BiLogOut /></div>*/}
                    <div className="container">
                    <div className="inner">
                        <Header />
                        <div className={"bg-dark"} style={{borderRadius: "8px"}}>
                            <InputTodo addTodoProps={this.addTodo}/>
                        </div>

                        <TodosList showMembers={this.showMembers} todos={this.state.todos} handleChangeProbs={this.handleChange} deleteTodoProps={this.delTodo} updateTodo={this.updateTodo}/>
                        </div>
                    <MembersComponent show={this.state.showMembers} hideMembers={this.hideMembers} />
                </div>
                </div>
        } else {
            view = <Navigate to={"/login"} />
        }
        return (
            <div>
                {view}
            </div>
        )
    }
}

export default TodoContainer