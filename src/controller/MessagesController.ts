import type { Request, Response } from 'express';
import type { MessageType } from '../type/MessageType';

let messages: MessageType[] = [];

export const getMessages = (req: Request, res: Response) => {
  res.json(
    messages.filter(
      (message) => message.receiver.id === parseInt(req.params.id) || message.sender.id === parseInt(req.params.id)
    )
  );
};

export const postMessages = (req: Request, res: Response) => {
  const newMessage = req.body;
  messages.push(newMessage);
  res.json(newMessage);
};
