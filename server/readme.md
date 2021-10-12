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
  name: string
  description: string
  img: string
  category: string
  criteria: number
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

#### /login - METHOD: post

Request:
```
{
  emailOrUserName: string
  password: string
}
```

#### /logout - METHOD: post

Request:
```
headers: {
  Authorization: Bearer JsonWebTokenHere
}
```

##### /user - METHOD: post - create a user

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

#### /user - METHOD: GET - retrieve user information

```
headers: {
  Authorization: Bearer JsonWebTokenHere
}
```

### Quests

#### /quest/start/:questId - METHOD: POST - start a quest

Requires JWT

Request:
```
headers: {
  Authorization: Bearer JsonWebTokenHere
}
```

#### /quest/complete/:questId - METHOD: POST - complete a quest

Request:
```
headers: {
  Authorization: Bearer JsonWebTokenHere
}
```

#### /quest - METHOD: GET - retrieves a user's active quests

Request:
```
headers: {
  Authorization: Bearer JsonWebTokenHere
}
```

### Tasks IGNORE THESE - NOT FUNCTIONAL

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

#### /achievement - METHOD: GET - retrieve user achievements

Request:
```
headers: {
  Authorization: Bearer JsonWebTokenHere
}
```

#### /achievement/templates - METHOD: GET - retrieve all achievement templates

### /achievement/:id - METHOD: POST - grant user achievement 

Request:
```
headers: {
  Authorization: Bearer JsonWebTokenHere
}
```
