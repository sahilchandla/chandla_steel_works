//Protecting the route


import React from 'react'
import { Navigate } from 'react-router-dom'
const AdminRoute =({children})=> {
    let user = JSON.parse(localStorage.getItem("user"));

    if(!user){
        return <Navigate to="/login"/>
    }
    if(user.role !== "admin"){
        return <Navigate to="/"/>
    }
  return children;
};

export default AdminRoute;
