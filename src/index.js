import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import TodoContainer from "./components/Todocontainer"

import "./app.css"
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<TodoContainer />}/>
        </Routes>
    </BrowserRouter>, 
    document.getElementById("root")
)