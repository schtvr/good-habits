import { Response } from 'express';

const sendRes = (res: Response, isGood: boolean, status: number, message: string, data?: any) => {
  res.status(status).send({
    status: `${isGood ? 'Okay' : 'Bad'}`,
    message,
    data: data
  });
};

export default sendRes;
