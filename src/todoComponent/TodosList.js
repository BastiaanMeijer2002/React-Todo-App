import React from "react";
import TodoItem from "./Todoitem";

class TodosList extends React.Component {
    render() {
        console.log(this.props.todos)
        return (
            <ul>
                {this.props.todos.map(todo => (
                        <TodoItem showMembers={this.props.showMembers} key={todo.id} todo={todo} handleChangeProbs={this.props.handleChangeProbs} deleteTodosProps={this.props.deleteTodoProps} updateTodo={this.props.updateTodo}/>
                ))}
            </ul>
        )
    }
}

export default TodosList