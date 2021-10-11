import Task from '../models/task';
import { Request, Response } from 'express';

const getTaskById = async (req: Request, res:Response) => {
  if (!req.params.id) return res.status(422).send('Missing taskId');
  const foundTask = await Task.findOne({
    where: {
      id: req.params.id
    }
  });
  res.json(foundTask);
};

const completeTaskById = async (req: Request, res:Response) => {
  if (!req.user) return res.status(400).send('Not authenticated');
  if (!req.body.taskId) return res.status(422).send('Missing taskId');
  const foundTask = await req.user.getTaskHistory({ where: { id: req.body.taskId }});
  const result = foundTask.complete();
  if (result) return res.status(200).send('Success!');
};

export default {
  getTaskById,
  completeTaskById
};