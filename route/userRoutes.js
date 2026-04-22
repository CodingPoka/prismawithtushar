

import {Router} from 'express';
import { createUser, fetchUser, updateUser,showUser, deleteUser } from '../Controller/UserController.js';

const router=Router();


router.post("/",createUser);
router.put("/:id",updateUser);
router.get("/",fetchUser);
router.get("/:id",showUser);
router.delete("/:id",deleteUser);

export default router;