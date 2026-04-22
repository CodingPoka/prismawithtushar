

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



//update the user

export const updateUser = async(req,res)=>{
   //this is user id which we want to update
    const userId=req.params.id;

    const {name,email,password}=req.body;

    await prisma.user.update({
        where:{
            id: Number(userId)
        },
        data:{
            name:name,
            email:email,
            password:password
        }
    })

    return res.json({
        status:200,
        message:"User updated successfully"
    })

}


//get all user

export const  fetchUser= async(req,res)=>{
    const users = await prisma.user.findMany();

    return res.json({
        status:200,
        message:"Users fetched successfully",
        data:users
    })
}

//show user
export const showUser = async(req,res)=>{
    const userId=req.params.id;

    const user =await prisma.user.findFirst({
        where:{
            id:Number(userId)
        },

        //with specif user we also get the all the posts of that user
        include:{
            post:{
                select:{
                    title: true,
                    commentCount: true
                }
            }
        }
    })

    return res.json({
        status:200,
        message:"User fetched successfully",
        data:user
    })
}

//delete user

export const deleteUser = async(req,res)=>{
    const userId=req.params.id;

    await prisma.user.delete({
        where:{
            id:Number(userId)
        }
    })
    
    return res.json({
        status:200,
        message:"User deleted successfully"
    })
}
