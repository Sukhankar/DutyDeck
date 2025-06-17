import express from 'express';
import { 
  createTask, 
  getAllTasks, 
  getTasksForUser, 
  getTaskStats, 
  getUserInsights,
  addQueryToTask,
  deleteQuery,
  updateTaskStatus,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/', getAllTasks); // Optional: view tasks
router.get('/user', getTasksForUser); // GET /api/tasks/user?email=user@example.com
router.get('/stats', getTaskStats); // GET /api/tasks/stats
router.get('/user-insights', getUserInsights);
router.patch('/:taskId/status', updateTaskStatus);
router.put('/:taskId', updateTask); // PUT /api/tasks/:taskId
router.delete('/:taskId', deleteTask); // DELETE /api/tasks/:taskId
router.post('/:taskId/queries', addQueryToTask);
router.delete('/:taskId/queries/:queryId', deleteQuery);

export default router;