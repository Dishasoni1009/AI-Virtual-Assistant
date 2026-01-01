import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

function SignUp() {
    
    const [showPassword,setShowPassword]=useState(false)
    const {serverUrl}=useContext(UserDataContext)
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleSignUp = async (e)=>{
    e.preventDefault()
         // Sign up logic to be implemented
  

     try {
        let result = await axios.post(`${serverUrl}/api/auth/signup`,{
    name,email,password},{withCredentials :true} 
        );
        console.log("Sign up successful:", result.data);
        
        // ye new add kara h mene harsh 
        // Redirect to sign in page after successful signup
        navigate("/signin");
        // ye new add kara h mene harsh 

    } catch (error) {
        console.error("Error during sign up:", error);

        // ye new add kara h mene harsh 
        // Log the actual error message from backend
        if (error.response && error.response.data && error.response.data.message) {
            console.error("Backend error:", error.response.data.message);
            alert(error.response.data.message); // Show error to user
        } else {
            alert("An error occurred during sign up. Please try again.");
        }
        // ye new add kara h mene harsh 
    } 
};
    return (
       <div className="w-full h-[100vh] bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${bg})` }}>


            <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]' onSubmit={handleSignUp}>

                <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Register to <span className='text-blue-400'>Virtual Assistant</span></h1>

                <input type="text" placeholder='Enter your Name' className='w-full h-[60px] outline-none border-2 border-white bg-transparent  text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e)=>setName(e.target.value)} value={name} />

                <input type="email" placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent  text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e)=>setEmail(e.target.value)} value={email} />

                <div className="w-full h-[60px] border-2 border-white bg-transparent  text-white rounded-full text-[18px] relative">
                   <input type={showPassword?"text":"password"} placeholder='Password' className='w-full h-full outline-none bg-transparent  text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e)=>setPassword(e.target.value)} value={password}/> 

                   {!showPassword && <IoMdEye className="absolute top-[20px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer " onClick={()=>setShowPassword(true)}/>}

                     {showPassword && <IoMdEyeOff className="absolute top-[20px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer" onClick={()=>setShowPassword(false)}/>}
                   
                </div>
                <button className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold  bg-white rounded-full ] ">Sign Up</button>

                <p className='text-[white] text-[18px] cursor-pointer' onClick={()=>navigate("/signin")}>Already have an account ? <span className='text-blue-400'>Sign In</span></p>


            </form>
        </div>
    )
}

export default SignUp