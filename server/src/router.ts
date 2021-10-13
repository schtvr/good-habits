import express from 'express';
import user from './controllers/userController';
import auth from './controllers/authController';
import quests from './controllers/questController';
import verify from './middlewares/auth';
import tasks from './controllers/taskController';
import achievements from './controllers/achievementController';
const router = express.Router();

// USER ROUTES
router.post('/user', user.createUser);
router.get('/user/', verify , user.findUserById);
router.put('/user/:id/friendRequest',verify ,user.putFriendRequest);
router.get('/user/friendRequestReceived', verify ,user.getFriendRequestReceived);
router.get('/user/friendRequestSent', verify ,user.getFriendRequestSent);
router.put('/user/:id/acceptFriendRequest', verify ,user.acceptFriendRequest);
router.get('/user/friends', verify ,user.getFriends);
router.put('/user/:id/cancelFriendRequest', verify ,user.cancelFriendRequest);
router.put('/user/:id/unfriend', verify ,user.unfriend);





//AUTH ROUTES
router.post('/login', auth.login);
router.post('/logout', verify, auth.logout);

// QUEST ROUTES
router.post('/quest/start/:questId', verify, quests.startQuest);
router.post('/quest/complete/:questId', verify, quests.completeQuest);
router.get('/quest/getActiveQuests', verify, quests.getUserActiveQuests);
router.get('/quests', quests.getQuestTemplates);

// TASK ROUTES
router.get('/task/:id', verify, tasks.getTaskById);
router.post('/task/:taskId', verify , tasks.completeTaskById);
router.get('/task/quest/:questId', tasks.getQuestTasks);
router.get('/task', verify, tasks.getTaskHistory);

//ACHIEVEMENT ROUTES
router.get('/achievement/templates', achievements.getAllAchievements);
router.get('/achievement', verify, achievements.getUserAchievements);
router.post('/achievement/:id', verify, achievements.grantAchievement);

export default router;
