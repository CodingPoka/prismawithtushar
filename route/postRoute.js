





import {Router} from 'express'
import { createPost, fetchPost, updatePost,showPost, deletePost } from '../Controller/PostController.js';


const router=Router();


router.get("/",fetchPost);
router.post("/",createPost);
router.get("/:postId",showPost);
router.put("/:postId",updatePost);
router.delete("/:postId",deletePost);


export default router;