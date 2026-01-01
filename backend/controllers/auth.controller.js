// import User from "../models/user.models.js"
// import bcrypt from "bcryptjs"
// // import User from "../models/user.models"

// //here are 3 controller functions signUp , Login , logOut

// export const signUp = async (req, res) => {
//     try {
//         const { name, email, password } = req.body

//         const existEmail = await User.findOne({ email })
//         if (existEmail) {
//             return res.status(400).json({ message: "Email already exists" })
//         }

//         if (password.length < 6) {
//             return res.status(400).json({ message: "Password must be at least 6 characters long !!" })

//         }
//         const hashedPassword = await bcrypt.hash(password, 10)


//         const User=await User.create({
//             name,password:hashedPassword,email
//         })

//         const token=await genToken(User._id)

//         res.cokkie("token",token,{
//             httpOnly:true,
//             maxAge:7*24*60*60*1000, // 7 days
//             sameSite:"strict",
//             secure:false
//         })
//         res.status(201).json(User)
//     } catch (error) {
//         return res.status(500).json({message:'Error in registering user'})
//     }
// }




// export const Login = async (req, res) => {
//     try {
//         const {email, password} = req.body

//         const user = await User.findOne({ email })
//         if (!user) {
//             return res.status(400).json({ message: "Email does not  exists" })
//         }

//         const isMatch=await bcrypt.compare(password,user.password)

//         if (!isMatch) {
//             return res.status(400).json({ message: "Incorrect Password" })
//         }
        
//         const token=await genToken(User._id)

//         res.cookie("token",token,{
//             httpOnly:true,
//             maxAge:7*24*60*60*1000, // 7 days
//             sameSite:"strict",
//             secure:false
//         })
//         return res.status(20).json(user)
//     } catch (error) {
//         return res.status(500).json({message:'LogIn Error'})
//     }
// }

// export const logOut=async(req,res)=>{
//     try{
//         res.clearCookie("token")
//         return res.status(200).json({message:"Log Out Succesfully"})
//     }catch(error){
//         return res.status(500).json({message:'LogOut Error $ {error}'})
//     }
// }

import User from "../models/user.models.js"
import bcrypt from "bcryptjs"
// import genToken from "../utils/genToken.js"
import genToken from "../config/token.js"

export const signUp = async (req, res) => {
  try { 
    // const { username, email, password } = req.body
    const { name, email, password } = req.body

    // if (!username || !email || !password) {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const existEmail = await User.findOne({ email })
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      // name: username,
      name,
      email,
      password: hashedPassword
    })

    // const token = genToken(user._id)
    const token = await genToken(user._id)

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false
    })

    return res.status(201).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error in registering user" })
  }
}

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Email does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" })
    }

    // const token = genToken(user._id)
    const token = await genToken(user._id)

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict",
      secure: false
    })

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "LogIn Error" })
  }
}

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token")
    return res.status(200).json({ message: "Log Out Successfully" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "LogOut Error" })
  }
}
