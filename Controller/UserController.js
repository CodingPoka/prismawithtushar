

import prisma from "../db/db.config.js";



export const createUser= async(req,res)=>{
    const {name,email,password}=req.body;

    const findUser = await prisma.user.findUnique({
        where:{
            email: email
        }
    })

    if(findUser){
        return res.json({
            status:404,
            message:"User already exists"
        })
    }

    const newUser = await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:password
        }
    })

    return res.json({
        status:200,
        message:"User created successfully",
        data:newUser
    })
}