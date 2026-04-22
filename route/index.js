

import { Router} from "express";

import UserRoutes from "./userRoutes.js";

import PostRoutes from "./postRoute.js";
import CommentRoutes from "./commentRoute.js";


const router=Router();



//for user routes
router.use("/api/user",UserRoutes);

//for post routes
router.use("/api/post",PostRoutes);

//for comment routes
router.use("/api/comment",CommentRoutes);

export default router;