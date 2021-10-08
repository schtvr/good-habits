CREATE TABLE "user" (
  "id" int,
  "firstName" string,
  "lastName" string,
  "userName" string,
  "email" string,
  "password" string,
  "EXP" int,
  "level" int
);

CREATE TABLE "taskHistory" (
  "userId" int,
  "questId" int,
  "taskId" int,
  "completedDate" int,
  "completed" boolean,
  "textInput" string,
  "userPicture" string
);

CREATE TABLE "activeQuests" (
  "userId" int,
  "questId" int,
  "startDate" int,
  "progress" int,
  "taskId" int
);

CREATE TABLE "completedQuests" (
  "userId" int,
  "questId" int,
  "startDate" int,
  "progress" int
);

CREATE TABLE "quests" (
  "id" int,
  "duration" int,
  "name" string,
  "description" string,
  "category" string,
  "missedCheckIn" boolean,
  "completionEXPValue" int
);

CREATE TABLE "tasks" (
  "questId" int,
  "taskDescription" string,
  "id" int,
  "EXPValue" int,
  "nextTaskId" int,
  "previousTaskId" int
);

CREATE TABLE "achievementsDictionary" (
  "id" int,
  "description" string,
  "img" string,
  "category" string,
  "criteria" string
);

CREATE TABLE "achievementsByUser" (
  "id" int,
  "userId" int,
  "achievementId" int
);

ALTER TABLE "activeQuests" ADD FOREIGN KEY ("userId") REFERENCES "user" ("id");

ALTER TABLE "activeQuests" ADD FOREIGN KEY ("questId") REFERENCES "quests" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("questId") REFERENCES "quests" ("id");

ALTER TABLE "activeQuests" ADD FOREIGN KEY ("taskId") REFERENCES "tasks" ("id");

ALTER TABLE "completedQuests" ADD FOREIGN KEY ("userId") REFERENCES "user" ("id");

ALTER TABLE "taskHistory" ADD FOREIGN KEY ("userId") REFERENCES "user" ("id");

ALTER TABLE "taskHistory" ADD FOREIGN KEY ("questId") REFERENCES "quests" ("id");

ALTER TABLE "taskHistory" ADD FOREIGN KEY ("taskId") REFERENCES "tasks" ("id");

ALTER TABLE "completedQuests" ADD FOREIGN KEY ("questId") REFERENCES "quests" ("id");

ALTER TABLE "achievementsByUser" ADD FOREIGN KEY ("achievementId") REFERENCES "achievementsDictionary" ("id");

ALTER TABLE "achievementsByUser" ADD FOREIGN KEY ("userId") REFERENCES "user" ("id");
