import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controller/UserController.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;