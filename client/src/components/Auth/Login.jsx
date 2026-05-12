import React, {  useState } from 'react'
import './Auth.css'
import {  Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';


const Login = () => {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

   const baseUrl =import.meta.env.VITE_API_URL




  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
       const res =await axios.post(`${baseUrl}/api/v1/user/login`,{email,password})
       toast.success("login Succssfully")
       navigate('/home')
       console.log(res.data,"login successfully")
       
        localStorage.setItem("auth", JSON.stringify(res.data));
      
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
      
    }
  
  }

    
  return (
    <div className="main">
      <div className="card">
        <h3>Login</h3>
        <form action="" onSubmit={handleSubmit} >
          

          <label htmlFor="">Email</label>
          <input
           type="email"
            placeholder="John Doe" required
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            />

          <label htmlFor="">Password</label>
          <input 
          type="password" 
          placeholder="John Doe" required
          value={password}
          onChange={(e)=>setPassword(e.target.value)} 
          />

          <p className="user">
            Not a user!{" "}
            <Link to="/" className="login-link">
              Register
            </Link>
          </p>

          <button className='lr-btn' type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login