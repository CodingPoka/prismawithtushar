

import prisma from "../db/db.config.js";


export const fetchComment = async(req,res)=>{

    const postId = req.params.postId;

    const comments = await prisma.comment.findMany();

    return res.json({
        status:200,
        message:"Comments fetched successfully",
        data:comments
    })
}

//fetch single comment
export const showComment = async(req,res)=>{

    const commentId = req.params.commentId;

    const comment = await prisma.comment.findFirst({
        where:{
            id: Number(commentId)
        }
    })

    return res.json({
        status:200,
        message:"Comment fetched successfully",
        data:comment
    })
}

//create comment
export const createComment = async(req,res)=>{

    const {postId, userId, comment} = req.body;


    //increment the comment count in post table

    await prisma.post.update({
        where:{
            id: Number(postId)
        },
        data:{
            commentCount: {
                increment: 1
            }
        }
    })

    const newComment = await prisma.comment.create({
        data:{
            postId: Number(postId),
            userId: Number(userId),
            comment: comment
        }
    })

    return res.json({
        status:200,
        message:"Comment created successfully",
        data:newComment
    })
}

//update comment
export const updateComment = async(req,res)=>{

    const commentId = req.params.commentId;
    const {comment} = req.body;

    const updatedComment = await prisma.comment.update({
        where:{
            id: Number(commentId)
        },
        data:{
            comment: comment
        }
    })

    return res.json({
        status:200,
        message:"Comment updated successfully",
        data:updatedComment
    })
}

//delete comment
export const deleteComment = async (req, res) => {
  const commentId = req.params.commentId;

  // 1. Find comment
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId
    }
  });

  // 2. Decrement comment count
  await prisma.post.update({
    where: {
      id: comment.postId
    },
    data: {
      commentCount: {
        decrement: 1
      }
    }
  });

  // 3. Delete comment
  const deletedComment = await prisma.comment.delete({
    where: {
      id: commentId
    }
  });

  return res.json({
    status: 200,
    message: "Comment deleted successfully",
    data: deletedComment
  });
};