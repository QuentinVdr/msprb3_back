import express from 'express';
const app = express();
app.use(express.json());

let plants = [
  /*...defaultPlants...*/
];

app.get('/plants', (req, res) => {
  res.json(plants);
});

app.get('/plants/:userId', (req, res) => {
  const userPlants = plants.filter((plant) => plant.owner.id === parseInt(req.params.userId));
  res.json(userPlants);
});

app.post('/plants', (req, res) => {
  const newPlant = req.body;
  plants.push(newPlant);
  res.json(newPlant);
});

app.put('/plants/:id', (req, res) => {
  const updatedPlant = req.body;
  plants = plants.map((plant) => (plant.id === parseInt(req.params.id) ? updatedPlant : plant));
  res.json(updatedPlant);
});

app.delete('/plants/:id', (req, res) => {
  plants = plants.filter((plant) => plant.id !== parseInt(req.params.id));
  res.json({ message: 'Plant deleted' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
