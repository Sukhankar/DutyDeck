import express from 'express';
import { createTask, getAllTasks, getTasksForUser, getTaskStats, getUserInsights } from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/', getAllTasks); // Optional: view tasks
router.get('/user', getTasksForUser); // GET /api/tasks/user?email=user@example.com
router.get('/stats', getTaskStats); // GET /api/tasks/stats
router.get('/user-insights', getUserInsights);

export default router;
