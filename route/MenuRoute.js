import express from 'express';
import { getMenus, getMenuById, createMenu, updateMenu, deleteMenu } from '../controller/MenuController.js';
const router = express.Router();

router.get('/', getMenus);
router.get('/:id', getMenuById);
router.post('/', createMenu);
router.put('/:id', updateMenu);
router.delete('/:id', deleteMenu);

export default router;