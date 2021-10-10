import express from 'express';
import user from './controllers/user';
import quests from './controllers/quests';
import verify from './middlewares/auth';
import tasks from './controllers/task';
const router = express.Router();

// USER ROUTES
router.post('/login', user.loginUser);
router.post('/user', user.createUser);
router.get('/user', verify , user.findUserById);

// QUEST ROUTES
router.post('/quest/start', verify, quests.startQuest);
router.post('/quest/complete', verify, quests.completeQuest);
router.get('/quest/getActiveQuests', verify, quests.getUserActiveQuests);

// TASK ROUTES
router.post('/task/:id', verify, tasks.getTaskById);
router.post('/task/setComplete', verify , tasks.completeTaskById);
export default router;
