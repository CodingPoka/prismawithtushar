
import prisma from "../db/db.config.js"


//get all posts
export const fetchPost = async(req,res)=>{

    const posts = await prisma.post.findMany();

    return res.json({
        status:200,
        message:"Posts fetched successfully",
        data:posts
    })

}

//create post
export const createPost = async(req,res)=>{

    const {userId, title, description} = req.body;


    const newPost = await prisma.post.create({
        data:{
            userId: Number(userId),
            title:title,
            description:description
        }
    })

    return res.json({
        status:200,
        message:"Post created successfully",
        data:newPost
    })
}


//fetch single post
export const showPost = async(req,res)=>{

    const postId = req.params.postId;

    const post = await prisma.post.findFirst({
        where:{
            id: Number(postId)
        },
        //with specific post we also get the all the comments of that post
        include:{
            comment: {
                include:{
                    user:{
                        select:{
                            name:true
                        }
                    }
                }
            }
        }
    })

    return res.json({
        status:200,
        message:"Post fetched successfully",
        data:post
    })
}


//update post

export const updatePost = async(req,res)=>{

    const postId = req.params.postId;

    const {title, description} = req.body;

    await prisma.post.update({
        where:{
            id: Number(postId)
        },
        data:{
            title: title,
            description: description
        }
    })

    return res.json({
        status:200,
        message:"Post updated successfully"
    })
}

//delete post

export const deletePost = async(req,res)=>{
    const postId = req.params.postId;

    await prisma.post.delete({
        where:{
            id: Number(postId)
        }
    })
    
    return res.json({
        status:200,
        message:"Post deleted successfully"
    })
}
