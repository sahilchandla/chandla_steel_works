import React, { useState } from 'react'
import './Signup.css';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from './api';
function Signup() {
    let [name,setName] = useState("");
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");

    let navigate = useNavigate();

    let handleSignup=async(e)=>{
        e.preventDefault();
        try{
            let {data} = await api.post("/user/signup",{name,email,password})
        console.log(data)
        toast.success(data.message,{autoClose:2200})
        if(data.success){
            setTimeout(()=>{
                navigate("/login")
            },2700)
        }
        }
        catch(err){
            // console.log(err.response.data.message)
            toast.error(err.response.data.message)
        }
    }
    return (
        <div>

            <form action="" className='signup-form mb-5' onSubmit={handleSignup}>
                <div className="signup-form-feild mt-5">
                    <h1>Welcome</h1>
                    <p>Fill the form to create your account</p>
                    <input type="text" name="" id="" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/><br />
                    <input type="email" name="" id="" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
                    <input type="text" name="" id="" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/><br />
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
