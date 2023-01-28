import React, {useEffect, useState} from "react";
import {FaPlusCircle, FaTrash} from "react-icons/fa";

async function getUsers(id) {
    const token = `Bearer ${localStorage.getItem("token")}`
    let headers = new Headers()
    headers.append("Authorization", token)

    return fetch(`http://localhost:8000/api/get-users-from-todo/${id}`,{
        headers: headers
    }).then(res => res.json())
}

async function addUserToTodo(user,todo) {
    const token = `Bearer ${localStorage.getItem("token")}`
    let headers = new Headers()
    headers.append("Authorization", token)

    return fetch(`http://localhost:8000/api/users?email=${user}`, {
        method: "GET",
        headers: headers
    }).then(res => res.json())
        .then(res => {
            if (res["hydra:totalItems"] === 0) {
                alert("User not found")
            } else {
                const userID = res['hydra:member'][0]["id"]
                console.log(todo)
                fetch('http://localhost:8000/api/add-user-to-todo', {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({user: userID, todo: todo.id})
                })
            }
        })
}

async function removeUserToTodo(user,todo) {
    const token = `Bearer ${localStorage.getItem("token")}`
    let headers = new Headers()
    headers.append("Authorization", token)

    return fetch('http://localhost:8000/api/remove-user-from-todo', {
        method: "POST",
        headers: headers,
        body: JSON.stringify({user: user, todo: todo.id})
    })
}


const MembersComponent = (props) =>{
    if (!props.show){
        return null
    }

    const [members, setMembers] = useState([])
    const [email, setEmail] = useState("")

    useEffect( () => {
        async function getMembers() {
            let users = await getUsers(props.show.id)

            const userList = () => {
                const list = []
                for (let user in users) {
                    if (users[user]['id'] !== parseInt(localStorage.getItem("id"))){
                        list.push(users[user])
                    }
                }
                return list
            }

            setMembers(userList)
        }
        getMembers()

    })

    const addMember = async () => {
        const user = await addUserToTodo(email, props.show)
    }

    const deleteMember = async (id) => {
        const user = await removeUserToTodo(id, props.show)
        console.log(user)
    }

    return (
        <div>
            <div className="form-container bg-dark">
                <input placeholder={"Add member by email"} onChange={event => setEmail(event.target.value)} className="input-text bg-dark text-white" />
                <button onClick={addMember} className="input-submit"><FaPlusCircle /></button>
            </div>
            {members.map((member, index) => {
               return (
                   <div key={index} style={{paddingTop: "10px"}} className={"form-container bg-dark text-white"}>
                       <p>{member.name}</p>
                       <div onClick={() => {deleteMember(member.id)}}><FaTrash /></div>
                   </div>
               )
            })}
        </div>
    )
}

export default MembersComponent