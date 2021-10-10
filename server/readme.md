# API documentation

## Endpoints

### Authenticaton

/login
/user - post: create user
/user - get: get user by id (from JWT payload)

### Quests

#### /quest/start - post: start a quest

Requires JWT for authentication

Request should model:
body
{
  questId: number;
}

Returns:
{
  activeQuest: {
    id
    userId
    questId
    startDate
    progress
  }
}


#### /quest/complete - post: complete a quest

Requires JWT for authentication

Request should model:
body
{
  questId: number;
}

Returns:
{
  'Quest completed'
}


#### /quest/getActiveQuests - get: retrieves a user's active quests

Requires JWT for authentication

Returns:\
{\
  activeQuests: [activeQuest]\
}\

### Tasks

#### /task/:id - get: get details about a task (requires JWT)

No other information required (id in url)

#### /task/setComplete - post: mark a task completed (requires JWT)

Requires JWT for authentication
Request should model:
body
{
  taskId: number;
}



