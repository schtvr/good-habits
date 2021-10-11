import express from 'express';
import user from './controllers/userController';
import auth from './controllers/authController';
import quests from './controllers/questController';
import verify from './middlewares/auth';
import tasks from './controllers/taskController';
const router = express.Router();

// USER ROUTES
router.post('/user', user.createUser);
router.get('/user', verify , user.findUserById);

//AUTH ROUTES
router.post('/login', auth.login);
router.post('/logout', auth.logout);


// QUEST ROUTES
router.post('/quest/start', verify, quests.startQuest);
router.post('/quest/complete', verify, quests.completeQuest);
router.get('/quest/getActiveQuests', verify, quests.getUserActiveQuests);

// TASK ROUTES
router.get('/task/:id', verify, tasks.getTaskById);
router.post('/task/setComplete', verify , tasks.completeTaskById);
export default router;
