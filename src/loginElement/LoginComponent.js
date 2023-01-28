import React, {useState} from "react"
import {useNavigate} from "react-router-dom";
import styles from './loginComponent.module.css'

async function loginUser(email, password) {
    return fetch("http://localhost:8000/api/login_check",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"email": email, "password": password})
        }).then(res =>
            res.json()
        )

}

async function getUser(token) {
    return fetch("http://localhost:8000/api/get-user",
        {
            headers: {"Authorization": "Bearer " + token}
        }).then(res => res.json())
}

const LoginElement = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let navigate = useNavigate()
    const loginSuccessful = () => {
        navigate("/")
    }

    const handleSubmit = async () => {
        if (password.trim() && email.trim()) {
            let token = await loginUser(email, password)
            if (token['code']){
                localStorage.clear()
                alert("wrong credentials")
            } else {
                token = token['token']
                let userId = await getUser(token)
                userId = userId["id"]
                localStorage.setItem("token", token)
                localStorage.setItem("id", userId)
                loginSuccessful()
            }
        } else {
            alert("Please fill in your login information")
        }
    }

    return (
        // <div>
        //     <label>Email:
        //         <input onChange={e => setEmail(e.target.value)} type={"text"} />
        //     </label>
        //     <label>Password:
        //         <input onChange={e => setPassword(e.target.value)} type={"password"} />
        //     </label>
        //     <button onClick={handleSubmit} type={"submit"}>Login</button>
        // </div>
        <div className={styles.loginContainer}>
            <div className={"bg-dark text-white"} style={{borderRadius: "8px"}}>
                <div style={{paddingTop:"5%"}} className={styles.loginItems}>
                    <h3>Welcome,</h3>
                    <h4>Please sign in to continue</h4>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <button type="submit" onClick={handleSubmit} style={{width: "100%", marginBottom:"10%"}} className="btn btn-primary">Sign in</button>
                    <span style={{marginBottom:"10%"}}>No account? Register <a href={"/register"}>here</a></span>
                </div>
            </div>
        </div>

    )
}

export default LoginElement