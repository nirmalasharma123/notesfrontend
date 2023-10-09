
import React,{ useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";



 export default function SignUp() {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
  


  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
    const data = await axios.post("http://localhost:3001/signUp", {
      username,
      email,
      password,
      phoneNo,
    })
    .then((res)=>{
      console.log(res.data.data);
      alert("successful")
      Navigate("/Login");
    }).catch((err)=>{
      console.log(err.response)
      alert(err.response.data)
    })
  
      } catch (error) {
        console.error('SignUp failed:', error);
       
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">UserName</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)}}
              placeholder='Username'
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Number" className="block text-gray-600">Phone No</label>
            <input
              type="text"
              id="PhoneNo"
              name="PhoneNo"
              value={phoneNo}
              onChange={(e) => {
                setPhoneNo(e.target.value)}}
                              placeholder='Phone Number'
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
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
              Sign Up
            </button>
            <Link  className="text-center" to="/Login"> Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}


