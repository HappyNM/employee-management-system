import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addLeave, getLeavesByEmployee, getAllLeaves, updateLeaveStatus } from '../controllers/leaveController.js';



const router = express.Router();


router.post('/add', authMiddleware, addLeave)
router.get('/:id', authMiddleware, getLeavesByEmployee)
router.get('/', authMiddleware, getAllLeaves)
router.patch('/:id/status', authMiddleware, updateLeaveStatus)



export default router;