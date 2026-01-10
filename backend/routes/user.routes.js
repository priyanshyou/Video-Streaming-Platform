import express from 'express';
import { getAllUsers, updateUserRole, deleteUser } from '../controllers/user.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require admin access
router.get('/', protect, admin, getAllUsers);
router.put('/:id/role', protect, admin, updateUserRole);
router.delete('/:id', protect, admin, deleteUser);

export default router;
