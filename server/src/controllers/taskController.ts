import Task from '../models/task';
import { Request, Response } from 'express';
import sendRes from '../funcs/sendRes';

const getTaskById = async (req: Request, res:Response) => {
  if (!req.params.id) return sendRes(res, false, 422, 'Missing taskId');

  const foundTask = await Task.findOne({
    where: {
      id: req.params.id
    }
  });
  return sendRes(res, true, 200, 'Enjoy your task poggers xD rawr *holds up spork*\nnewline (please retweet, don\'t forget to smash that mfkin like button my guy)', foundTask);
};

const completeTaskById = async (req: Request, res:Response) => {
  if (!req.user) return sendRes(res, false, 403, 'Not authenticated');
  if (!req.params.taskId) return sendRes(res, false, 422, 'Missing taskId');
  const foundTask = await req.user.getTaskHistory({ where: { id: req.params.taskId }});

  const result = await foundTask[0].complete();
  if (result) return sendRes(res, true, 200, 'Task completed');
};

export default {
  getTaskById,
  completeTaskById
};