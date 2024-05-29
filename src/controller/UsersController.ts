import type { Request, Response } from 'express';
import type { UserType } from '../type/UserType';
import { defaultUsers } from '../value/users';

export let users: UserType[] = [...defaultUsers];

export const isUser = (req: Request, res: Response) =>
  res.json(users.find((user) => user.mail === req.body.mail && user.password === req.body.password));

export const getUsers = (req: Request, res: Response) => res.json(users);

export const getUserById = (req: Request, res: Response) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  res.json(user);
};

export const postUser = (req: Request, res: Response) => {
  const newUser = req.body;
  users.push(newUser);
  res.json(newUser);
};

export const putUser = (req: Request, res: Response) => {
  const updatedUser = req.body;
  users = users.map((user) => (user.id === parseInt(req.params.id) ? updatedUser : user));
  res.json(updatedUser);
};

export const deleteUser = (req: Request, res: Response) => {
  users = users.filter((user) => user.id !== parseInt(req.params.id));
  res.json({ message: 'User deleted' });
};
