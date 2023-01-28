import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import TodoContainer from "./todoComponent/Todocontainer"

import "./app.css"
import LoginElement from "./loginElement/LoginComponent"
import RegisterComponent from "./registerComponent/RegisterComponent";
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<TodoContainer />}/>
            <Route path={"/login"} element={<LoginElement />}/>
            <Route path={"/register"} element={<RegisterComponent />}/>
        </Routes>
    </BrowserRouter>, 
    document.getElementById("root")
)