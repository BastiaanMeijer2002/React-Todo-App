import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "../loginElement/loginComponent.module.css";

async function registerUser(email,name,password){
    return fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        })
    }).then(res => res.json()).catch(error => console.log(error))
}

const RegisterComponent = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    let navigate = useNavigate()
    const registerSuccessful = () => {
        navigate("/login")
    }

    const handleRegister = async () => {
        if (email.trim() && password.trim() && name.trim()) {
            const user = await registerUser(email, name, password)
            if (user['id']) {
                registerSuccessful()
            } else {
                alert("This email is connected to an another account")
            }
        } else {
            alert("Please fill out all fields")
        }
    }

    return (
        // <div>
        //     <label>Name:
        //         <input onChange={e => setName(e.target.value)} type={"text"} required={true}/>
        //     </label>
        //     <label>Email:
        //         <input onChange={e => setEmail(e.target.value)} type={"email"} required={true}/>
        //     </label>
        //     <label>Password:
        //         <input onChange={e => setPassword(e.target.value)} type={"password"} required={true}/>
        //     </label>
        //     <button onClick={handleRegister}>Register</button>
        // </div>
        <div className={styles.loginContainer}>
            <div className={"bg-dark text-white"} style={{borderRadius: "8px"}}>
                <div style={{paddingTop:"5%"}} className={styles.loginItems}>
                    <h3>Welcome to our Todo App</h3>
                    <h4>Please register to use the App</h4>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Your name</label>
                        <input onChange={e => setName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <button type="submit" onClick={handleRegister} style={{width: "100%", marginBottom:"10%"}} className="btn btn-primary">Sign in</button>
                </div>
            </div>
        </div>
    )
}

export default RegisterComponent