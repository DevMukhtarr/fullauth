import "dotenv/config";
import user from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) =>{
    try {
        const { firstname, lastname, email, password } = req.body
    
        const oldUser = await user.findOne({email: email})
    
        if(oldUser){
            return res.status(424).json({
                status: false,
                message: "user already exists"
            })
        }
    
        if(!(firstname && lastname && email && password)){
            return res.status(424).json({
                status: false,
                message: "all fields are required"
            })
        }
        
        if( oldUser == null ){
            const encrptedPassword = await bcrypt.hash(password, 12);
    
            const newUser =  await user.create({
                first_name: firstname,
                last_name: lastname,
                email: email,
                password: encrptedPassword,
            })
    
            const token = jwt.sign({id: newUser._id, email:email }, process.env.JWT_SECRET_KEY,{expiresIn: "2d"});
    
            return res.status(200).json({
                status: true,
                message: "Registration successful",
                data: {
                    token: token
                }
            })
        }  
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred"
        }) 
    }
}


export const signIn = async (req, res) =>{
    try {
        const { email, password } = req.body;
    
        const oldUser = await user.findOne({email: email})
    
        if(!(email && password)){
            return res.status(424).json({
                status: false,
                message: "all fields are required"
            })
        }
        
        if( oldUser == null ){
            return res.status(424).json({
                status: false,
                message: "User does not exist"
            })
        }
        
        if( oldUser && (await bcrypt.compare(password, oldUser.password))){
            const token = jwt.sign({id: oldUser._id, email:email }, process.env.JWT_SECRET_KEY,{expiresIn: "2d"});
            return res.status(200).json({
                status: true,
                message: "Login Successful",
                data:{
                    token: token
                }
            })
        }else{
            return res.status(424).json({
                status: false,
                message: "Incorrect email or password"
            })  
        } 
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred"
        })  
    }
}

export const greetUser = async (req, res) =>{
    try {
        const id = req.user.id;

        const oldUser = await user.findById(id);

        if( oldUser ){
            return res.status(200).json({
                status: true,
                message: `Hello ${oldUser.first_name}`
            })
        }else{
            return res.status(498).json({
                status: false,
                message: `Invalid Id`
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred"
        })  
    }
}