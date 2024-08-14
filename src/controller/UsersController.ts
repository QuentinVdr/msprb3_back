import type { Request, Response } from 'express';
import type { UserType } from '../type/UserType';
import { defaultUsers } from '../value/users';

export let users: UserType[] = [...defaultUsers];

/**
 * @swagger
 * /users/isUser:
 *   post:
 *     summary: Check if a user exists
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user if found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
export const isUser = (req: Request, res: Response) =>
  res.json(users.find((user) => user.mail === req.body.mail && user.password === req.body.password));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
export const getUsers = (req: Request, res: Response) => res.json(users);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The user with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
export const getUserById = (req: Request, res: Response) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  res.json(user);
};

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
export const postUser = (req: Request, res: Response) => {
  const newUser = req.body;
  users.push(newUser);
  res.json(newUser);
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
export const putUser = (req: Request, res: Response) => {
  const updatedUser = req.body;
  users = users.map((user) => (user.id === parseInt(req.params.id) ? updatedUser : user));
  res.json(updatedUser);
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A message indicating the user was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export const deleteUser = (req: Request, res: Response) => {
  users = users.filter((user) => user.id !== parseInt(req.params.id));
  res.json({ message: 'User deleted' });
};
