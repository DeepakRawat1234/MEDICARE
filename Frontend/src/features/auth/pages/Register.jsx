import React ,{useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
const Register=()=>{
    const {loading,handleRegister}=useAuth();
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await handleRegister({email,username,password});
        navigate("/");
         if(loading){
        return (<main><h1>Loading....</h1></main>)
    }
    }
   

    return (
         <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                      <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input placeholder="Username" type="text" id="username" name="username" onChange={(e)=>setUsername(e.target.value)} / >
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input placeholder="Enter email address" type="email" id="email" name="email"  onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input placeholder="Password" type="password" id="password" name="password"  onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button type="submit " className="primary-button button">Register</button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </main>
    )
}
export default Register;