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

### Authenticaton

/login\
/user - post: create user\
/user - get: get user by id (from JWT payload)

### Quests

#### /quest/start - post: start a quest

Requires JWT

Request should model:
```
body
{
  questId: number;
}
```

Returns:
```
{
  activeQuest: {
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

Returns:
```
{
  'Quest completed'
}
```


#### /quest/getActiveQuests - get: retrieves a user's active quests

Requires JWT\
Returns:
```
{
  activeQuests: activeQuest[]
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
  achievements: Achievement[]
}
```

#### Get all achievements (templates)

Returns:
```
{
  allAchievements: Achievement[]
}
```

### Achievement Completed

Request should model:
```
{
  achievementId: number;
}
```

Returns:
```
{
  'Achievement granted'
}
```



