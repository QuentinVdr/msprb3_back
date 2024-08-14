import type { Request, Response } from 'express';
import type { PlantType } from '../type/PlantType';
import { defaultPlants } from '../value/plants';

let plants: PlantType[] = [...defaultPlants];

/**
 * @swagger
 * /plants:
 *   get:
 *     summary: Retrieve a list of plants
 *     tags: [Plants]
 *     responses:
 *       200:
 *         description: A list of plants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plant'
 */
export const getPlants = (req: Request, res: Response) => {
  res.json(plants);
};

/**
 * @swagger
 * /plants/user/{userId}:
 *   get:
 *     summary: Retrieve plants of a user
 *     tags: [Plants]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of user's plants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plant'
 */
export const getUserPlants = (req: Request, res: Response) => {
  const userPlants = plants.filter((plant) => plant.owner.id === parseInt(req.params.userId));
  res.json(userPlants);
};

/**
 * @swagger
 * /plants:
 *   post:
 *     summary: Create a new plant
 *     tags: [Plants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plant'
 *     responses:
 *       200:
 *         description: The created plant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 */
export const postPlant = (req: Request, res: Response) => {
  const newPlant = req.body;
  plants.push(newPlant);
  res.json(newPlant);
};

/**
 * @swagger
 * /plants/{id}:
 *   put:
 *     summary: Update an existing plant
 *     tags: [Plants]
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
 *             $ref: '#/components/schemas/Plant'
 *     responses:
 *       200:
 *         description: The updated plant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 */
export const putPlant = (req: Request, res: Response) => {
  const updatedPlant = req.body;
  plants = plants.map((plant) => (plant.id === parseInt(req.params.id) ? updatedPlant : plant));
  res.json(updatedPlant);
};

/**
 * @swagger
 * /plants/{id}:
 *   delete:
 *     summary: Delete a plant
 *     tags: [Plants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A message indicating the plant was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export const deletePlant = (req: Request, res: Response) => {
  plants = plants.filter((plant) => plant.id !== parseInt(req.params.id));
  res.json({ message: 'Plant deleted' });
};
