import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controller/UserController.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.get('/', verifyToken, getUsers);
router.get('/:id', verifyToken, getUserById);
router.post('/', verifyToken, createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;