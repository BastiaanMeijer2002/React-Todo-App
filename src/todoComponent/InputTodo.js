import React, { Component } from "react";
import { FaPlusCircle } from "react-icons/fa"

class InputTodo extends Component {

    state = {
        title: ''
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.title.trim()){
            this.props.addTodoProps(this.state.title);
            this.setState({
                title: ""
            });
        } else {
            alert("Please enter something")
        }
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit} className="form-container">
          <input className="input-text bg-dark text-white" name="title" type="text" placeholder="Add Todo..." value={this.state.title} onChange={this.onChange} />
          <button className="input-submit"><FaPlusCircle /></button>
        </form>
      )
    }
  }
  export default InputTodo
  