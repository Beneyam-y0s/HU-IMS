import {getAllUsers, createUser, updateUser, deleteUser} from "../controllers/userController.js"
import express from "express";

const router = express.Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getAllUsers);

export default router;