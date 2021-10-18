import express from 'express';
import user from './controllers/userController';
import auth from './controllers/authController';
import quests from './controllers/questController';
import verify from './middlewares/auth';
import tasks from './controllers/taskController';
import achievements from './controllers/achievementController';
import leaderboards from './controllers/leaderboardController';
const router = express.Router();

// USER ROUTES
// GET
router.get('/user', verify , user.getYourInfo);
router.get('/users', verify , user.getAllUsers);
router.get('/user/friendRequestReceived', verify ,user.getFriendRequestReceived);
router.get('/user/friendRequestSent', verify ,user.getFriendRequestSent);
router.get('/user/friends', verify ,user.getFriends);
router.get('/user/:userId', user.findUserById); // always have this as last get request pls

// POST
router.post('/user', user.createUser);
router.post('/setPfp', verify, user.setPfp);

// PUT
router.put('/user/friendRequest/:id',verify ,user.putFriendRequest);
router.put('/user/acceptFriendRequest/:id', verify ,user.acceptFriendRequest);
router.put('/user/cancelFriendRequest/:id', verify ,user.cancelFriendRequest);
router.put('/user/unfriend/:id', verify ,user.unfriend);

// LEADERBOARD ROUTES
router.get('/leaderboards', leaderboards.getAllRankings);
router.get('/leaderboards/friends', verify, leaderboards.getFriendRankings);

//AUTH ROUTES
router.post('/login', auth.login);
router.post('/logout', verify, auth.logout);

// QUEST ROUTES
router.post('/quest/start/:questId', verify, quests.startQuest);
router.post('/quest/complete/:questId', verify, quests.completeQuest);
router.get('/quest/getActiveQuests', verify, quests.getUserActiveQuests);
router.get('/quests', quests.getQuestTemplates);
router.get('/friendsOnQuest/:questId', verify, quests.getFriendsOnQuest);
router.get('/quest/:userId/completed', verify , quests.findCompletedQuestsById);
router.get('/quest/:userId/active', verify , quests.findActiveQuestsById);
router.post('/quest/drop/:questId', verify, quests.dropQuest);
router.get('/quest/completed', verify, quests.getCompletedQuests);

// TASK ROUTES
router.get('/task/:id', tasks.getTaskById);
router.post('/task/:taskId', verify , tasks.completeTaskById);
router.get('/task/quest/:questId', tasks.getQuestTasks);
router.get('/task', verify, tasks.getTaskHistory);
router.get('/tasks/daily', verify, tasks.getDailyTasks);

//ACHIEVEMENT ROUTES
router.get('/achievement/templates', achievements.getAllAchievements);
router.get('/achievement', verify, achievements.getUserAchievements);
router.post('/achievement/:id', verify, achievements.grantAchievement);

export default router;
