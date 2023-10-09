
import React,{ useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Home from './Home';




 export default function Login() {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  


  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
    const data = await axios.post("http://localhost:3001/login", {
      
      email,
      password,

    })
    .then((res)=>{
      console.log(res.data.data);
      localStorage.setItem("token", res.data.token);
      alert("successful")
      Navigate("/Home");
    }).catch((err)=>{
      alert(err.response.data)
    })
  
      } catch (error) {
        console.error('Login failed:', error);
       
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)}}         
                     placeholder='Email'
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)}}
              placeholder='Password'
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" 
            >
              Login
            </button>
            <Link  className="text-center" to="/"> Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}


