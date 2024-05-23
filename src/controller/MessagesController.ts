import type { Request, Response } from 'express';
import type { MessageType } from '../type/MessageType';

let messages: MessageType[] = [];

export const getMessages = (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const otherId = parseInt(req.params.otherId);
  res.json(
    messages.filter(
      (message) =>
        (message.receiver.id === userId && message.sender.id === otherId) ||
        (message.sender.id === userId && message.receiver.id === otherId)
    )
  );
};

export const postMessages = (req: Request, res: Response) => {
  const newMessage = req.body;
  messages.push(newMessage);
  res.json(newMessage);
};
