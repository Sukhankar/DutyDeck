import express from 'express';
import { createTask, getAllTasks, getTasksForUser } from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/', getAllTasks); // Optional: view tasks
router.get('/user', getTasksForUser); // GET /api/tasks/user?email=user@example.com

export default router;
