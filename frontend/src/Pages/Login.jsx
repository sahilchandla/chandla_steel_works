import React, { useState } from 'react'
import './Login.css';
import { api } from './api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Login() {
  let[email,setEmail] = useState("");
  let [password,setPassword] = useState("");

  let navigate = useNavigate();
  let handleLogin = async(e)=>{
    e.preventDefault();
     try{
                let {data} = await api.post("/user/login",{email,password})
            // console.log(data)
            toast.success(data.message,{autoClose:2200})
            localStorage.setItem("user",JSON.stringify(data.user));
            localStorage.setItem("token",JSON.stringify(data.token));
            if(data.success){
                setTimeout(()=>{
                    navigate("/")
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
      <form action="" className='login-form mb-5' onSubmit={handleLogin}>
        <div className="login-form-feild mt-5">
          <h1>Login</h1>
          <p className='para1'>Enter your credentials to access your account</p>
          <input type="email" name="" id="" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
          <input type="text" name="" id="" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/><br />
          <div className="remember-out">
              <div className='remember-in'>
                <input type="checkbox" name="" id="remember" /><label htmlFor='remember'>Remember me</label>
              </div>
              <a href="#">Forget Password?</a>
          </div>
          <button type="submit">Login</button>
          <p className='para2'>Don't have an account?<a href="/signup"> Create one</a></p>
        </div>
      </form>
    </div>
  )
}

export default Login
