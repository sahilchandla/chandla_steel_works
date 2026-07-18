import React from 'react'
import './Contact.css'
import { useState } from 'react'
import { api } from './api';
import { toast } from 'react-toastify';
function Contact() {
  let [name,setName] = useState("");
  let [email,setEmail] = useState("");
  let [number,SetNumber] = useState("");
  let [message,setMessage] = useState("");


  let handleContact = async (e) => {
    e.preventDefault();
    try{
      let result = await api.post("/contact",{
        name,email,number,message
      });
      console.log(result.data);
      toast.success( "Message sent successfully.");
      setName("");
      setEmail("");
      SetNumber("");
      setMessage("");
    } 
    catch(err){
      console.log(err);
      toast.error( "Something went wrong. Please try again later.");
    }
  }

 
  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <form className="col-md-5 shadow p-4 rounded" onSubmit={handleContact}>
        
          <h1 className="text-center mb-3">Contact Us</h1><br />
          <p className="text-center text-muted">For door frames & custom welding work, contact us anytime.</p><br />
          <input type="text" placeholder="Your Name" className='form-control mb-3 p-2' value={name} onChange={(e)=>setName(e.target.value)} required /><br />
          <input type="email" placeholder="Your Email" className='form-control mb-3 p-2' value={email} onChange={(e)=>setEmail(e.target.value)} required /><br />
          <input type="text" placeholder="Phone Number" className='form-control mb-3 p-2' required value={number} onChange={(e)=>SetNumber(e.target.value)}/><br />
          <textarea className='form-control mb-3 p-2' placeholder="Your Message and any Query ..." value={message} onChange={(e)=>setMessage(e.target.value)}></textarea><br />
          <button className="btn btn-dark w-100" type='submit'>Send Message</button>
        
      </form>
    </div>
  )
}

export default Contact
