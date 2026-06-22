import React, {useState} from "react";
import "../auth.form.scss";
import {useNavigate,Link} from "react-router-dom";
import {useAuth} from "../hooks/useAuth"
const Login=()=>{
    const {loading,handleLogin}=useAuth();
    const[email,setEmail]=useState("")
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
       await handleLogin({email,password});
       navigate("/")
        if(loading){
            return (<main><h1>Loading....</h1></main>)
        }
    }
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input placeholder="Enter email address" type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input placeholder="Password" type="password" id="password" name="password"
                        onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button type="submit " className="primary-button button">Login</button>
                </form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </main>
    )
}
export default Login;