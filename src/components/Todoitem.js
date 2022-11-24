import React from "react"
import styles from "./TodoItem.module.css"
import { FaTrash } from "react-icons/fa"


class TodoItem extends React.Component {

    state = {
        editing: false,
    }

    handleEdit = () => {
        this.setState({
            editing: true
        })
    }

    handleUpdateDone = e => {
        if (e.key === "Enter"){
            this.setState({
                editing: false
            })
        }
    }

    render() {
        const completedStyle = {
            fontStyle: "italic",
            color: "#595959",
            opacity: 0.4,
            textDecoration: "line-through",
          }

        let viewMode = {}
        let editMode = {}

        if (this.state.editing){
            viewMode.display = 'none'
        } else {
            editMode.display = 'none'
        }
          
        return <li className={styles.item}>
                    <div onDoubleClick={this.handleEdit} style={viewMode}>...</div>
                    <input 
                        type="text" 
                        style={editMode} 
                        className={styles.textInput} 
                        value={this.props.todo.title} 
                        onChange={e => {this.props.updateTodo(e.target.value, this.props.todo.id)}}
                        onKeyDown={this.handleUpdateDone}
                    />
                    <input
                        className={styles.checkbox} 
                        type="checkbox" 
                        checked={this.props.todo.completed} 
                        onChange={() => this.props.handleChangeProbs(this.props.todo.id)}
                    /> 
                    <button onClick={() => this.props.deleteTodosProps(this.props.todo.id)}><FaTrash /></button>
                    <span style={this.props.todo.completed ? completedStyle : null}>
                        {this.props.todo.title}
                    </span>
                </li>
    }
}

export default TodoItem