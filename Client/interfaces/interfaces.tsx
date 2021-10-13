export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  exp: string;
  level: number;
}

export interface IAchievements {
  id: number;
  userId: number;
  templateId: number;
  user: IUser;
  achievementTemplate: IAchievementTemplate;
}

export interface IAchievementTemplate {
  id: number;
  description: string;
  img: string;
  category: string;
  criteria: string;
  achievements: IAchievements;
}

export interface IQuest {
  id: number;
  duration: number;
  name: string;
  description: string;
  category: string;
  completionExp: number;
}

export interface IActiveQuest {
  id: number;
  userId: number;
  questId: number;
  startDate: Date;
  progress: number;
}

export interface ICompletedQuest {
  id: number;
  userId: number;
  questId: number;
  startDate: Date;
  progress: Date;
}

export interface ITask {
  id: number;
  questId: number;
  description: string;
  expValue: number;
  index: number;
  taskHistory: ITaskHistory;
}

export interface ITaskHistory {
  id: number;
  userId: number;
  taskId: number;
  questId: number;
  completedDate: Date | null;
  complted: boolean;
  textInput: string;
  userPictures: string;
}
