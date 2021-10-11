declare namespace Express {
  export interface Request {
    user: User | null
    questId: number | null
  }
}