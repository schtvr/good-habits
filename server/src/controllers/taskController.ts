import Task from '../models/task';
import { Request, Response } from 'express';

const getTaskById = async (req: Request, res:Response) => {
  if (!req.params.id) return res.status(422).send({status: 'bad', message: 'Missing taskId'});
  const foundTask = await Task.findOne({
    where: {
      id: req.params.id
    }
  });
  res.send({
    status: 'Okay',
    message: 'Enjoy your task poggers xD rawr *holds up spork*\nnewline (please retweet, don\'t forget to smash that mfkin like button my guy)',
    data: foundTask
  });
};

const completeTaskById = async (req: Request, res:Response) => {
  if (!req.user) return res.status(400).send({status: 'Bad' , message: 'Not authenticated'});
  if (!req.params.taskId) return res.status(422).send({status:'Bad', message: 'Missing taskId'});
  const foundTask = await req.user.getTaskHistory({ where: { id: req.params.taskId }});
  const result = await foundTask[0].complete();

  if (result) {return res.send({
    status: 'Okay',
    message: 'Task marked as completed',
  });}
};

export default {
  getTaskById,
  completeTaskById
};