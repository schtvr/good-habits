# API documentation

## Data Models

### User

```
{
  id: number
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
  exp: string
  level: number
}
```

User has many:
```
Achievement
ActiveQuest
CompletedQuest
TaskHistory
```

### Achievement

```
{
  id: number
  userId: number
  templateId: number
}
```

Belongs to: 
```
User
AchievementTemplate
```

### AchievementTemplate

```
{
  id: number
  description: string
  img: string
  category: string
  criteria: string
  completionExp: number
}
```

Has many:
```
Achievement
```

### Quests

```
{
  id: number
  duration: number
  name: string
  description: string
  category: string
  completionExp: number
}
```

Has many:
```
Task
Active Quests
```

### ActiveQuest

```
{
  id: number
  userId: number
  questId: number
  startDate: Date
  progress: number 
}
```

### CompletedQuest

// Add completed date here?

```
{
  id: number
  userId: number
  questId: number
  startDate: Date
  progress: Date
}
```

### Task

```
{
  id: number
  questId: number
  description: string
  expValue: number
  index: number
}
```

Has many:

```
TaskHistory
```

### TaskHistory

```
{
  id: number
  userId: number
  taskId: number
  questId: number
  completedDate: Date | null
  complted: boolean
  textInput: string
  userPictures: string
}
```

## Endpoints

Reponses follow the following model:
```
{
  status: 'Bad' | 'Okay'
  message: 'some response message handwritten by victor and/or timbo slice'
  data: whatever data you want bb
}
```

### Authenticaton

/login

Request:
```
{
  emailOrUserName: string
  password: string
}
```

/logout

Request:
```
headers: {
  Authorization: Bearer JsonWebTokenHere
}
```

/user - post: create user\

Request:
```
{
  userName: string
  firstName: string
  lastName: string
  email: string
  password: string
}
```

/user

```
headers: {
  Authorization: Bearer JsonWebTokenHere
}
```

### Quests ANYTHING PAST HERE IS NOT UP TO DATE

#### /quest/start - post: start a quest

Requires JWT

Request:
```
headers: {
  Authorization: Bearer JsonWebTokenHere
}

body: {
  questId: number;
}
```

Returns:
```
{
  data: {
    id
    userId
    questId
    startDate
    progress
  }
}
```

#### /quest/complete - post: complete a quest

Requires JWT\
Request should model:
```
body
{
  questId: number;
}
```

#### /quest/getActiveQuests - get: retrieves a user's active quests

Requires JWT\
Returns:
```
{
  data: activeQuest[]
}
```

### Tasks

#### /task/:id - get: get details about a task (requires JWT)

No other information required (id in url)

#### /task/setComplete - post: mark a task completed (requires JWT)

Requires JWT\
Request should model:
```
body
{
  taskId: number;
}
```

Returns:
```
{
  to be determined
}
```

### Achievements

#### get: get user achievements (endpoint TBD)

Requires JWT

Returns:
```
{
  data: Achievement[]
}
```

#### Get all achievements (templates)

Returns:
```
{
  data: Achievement[]
}
```

### Achievement Completed

Request should model:
```
{
  achievementId: number;
}
```



