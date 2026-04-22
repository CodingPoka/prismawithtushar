

import {Router} from "express";

import { createComment, fetchComment, updateComment,showComment, deleteComment } from "../Controller/CommentController.js";

const router=Router();


router.get("/",fetchComment);
router.post("/",createComment);
router.get("/:commentId",showComment);
router.put("/:commentId",updateComment);
router.delete("/:commentId",deleteComment);


export default router;

