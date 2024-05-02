import type { Request, Response } from 'express';
import type { PlantType } from '../type/PlantType';
import { defaultPlants } from '../value/plants';

let plants: PlantType[] = [...defaultPlants];

export const getPlants = (req: Request, res: Response) => {
  res.json(plants);
};

export const getUserPlants = (req: Request, res: Response) => {
  const userPlants = plants.filter((plant) => plant.owner.id === parseInt(req.params.userId));
  res.json(userPlants);
};

export const postPlant = (req: Request, res: Response) => {
  const newPlant = req.body;
  plants.push(newPlant);
  res.json(newPlant);
};

export const putPlant = (req: Request, res: Response) => {
  const updatedPlant = req.body;
  plants = plants.map((plant) => (plant.id === parseInt(req.params.id) ? updatedPlant : plant));
  res.json(updatedPlant);
};

export const deletePlant = (req: Request, res: Response) => {
  plants = plants.filter((plant) => plant.id !== parseInt(req.params.id));
  res.json({ message: 'Plant deleted' });
};
