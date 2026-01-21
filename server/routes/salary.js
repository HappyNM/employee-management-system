import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addSalary, getSalariesByEmployeeId, getSalariesByUserId, getMonthlySummary } from '../controllers/salaryController.js';


const router = express.Router();


router.post('/add', authMiddleware, addSalary)
router.get('/user/:id', authMiddleware, getSalariesByUserId)
// Place summary BEFORE the generic :id route to avoid conflicts
router.get('/summary/current', authMiddleware, getMonthlySummary)
router.get('/:id', authMiddleware, getSalariesByEmployeeId)


export default router;