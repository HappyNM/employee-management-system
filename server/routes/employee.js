import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addEmployee, getEmployees, upload, getEmployee , editEmployee, fetchEmployeesByDepId} from '../controllers/employeeController.js';


const router = express.Router();

router.get('/', authMiddleware, getEmployees);
router.post('/add', authMiddleware, upload.single('image'), addEmployee)
router.get('/department/:id', authMiddleware, fetchEmployeesByDepId);
router.get('/:id', authMiddleware, getEmployee)
router.put('/:id', authMiddleware, editEmployee)

export default router;