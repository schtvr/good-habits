import express from 'express';
import user from './controllers/user';
import quests from './controllers/quests';
import verify from './middlewares/auth';
const router = express.Router();

// USER ROUTES
router.post('/login', user.loginUser);
router.post('/user', user.createUser);
router.get('/user', verify , user.findUserById);

// QUEST ROUTES
router.post('/quest/start', verify, quests.startQuest);
router.post('/quest/complete', verify, quests.completeQuest);
router.get('/quest/getActiveQuests', verify, quests.getUserActiveQuests);

export default router;
