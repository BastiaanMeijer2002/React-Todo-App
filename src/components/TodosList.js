import React from "react";
import TodoItem from "./Todoitem";

class TodosList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} handleChangeProbs={this.props.handleChangeProbs} deleteTodosProps={this.props.deleteTodoProps}/>
                ))}
            </ul>
        )
    }
}

export default TodosList