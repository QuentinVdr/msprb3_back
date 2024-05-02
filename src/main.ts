import express from 'express';
import type { ArticleType } from './type/ArticleType';
import type { UserType } from './type/UserType';
import { defaultArticles } from './value/article';
import { defaultPlants } from './value/plants';
import { defaultUsers } from './value/users';
export const app = express();
app.use(express.json());

let plants = [...defaultPlants];

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

let users: UserType[] = [...defaultUsers];

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  res.json(user);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json(newUser);
});

app.put('/users/:id', (req, res) => {
  const updatedUser = req.body;
  users = users.map((user) => (user.id === parseInt(req.params.id) ? updatedUser : user));
  res.json(updatedUser);
});

app.delete('/users/:id', (req, res) => {
  users = users.filter((user) => user.id !== parseInt(req.params.id));
  res.json({ message: 'User deleted' });
});

let articles: ArticleType[] = [...defaultArticles];

app.get('/articles', (req, res) => {
  res.json(articles);
});

app.post('/articles', (req, res) => {
  const newArticle = req.body;
  articles.push(newArticle);
  res.json(newArticle);
});

app.put('/articles/:id', (req, res) => {
  const updatedArticle = req.body;
  articles = articles.map((article) => (article.id === parseInt(req.params.id) ? updatedArticle : article));
  res.json(updatedArticle);
});

app.delete('/articles/:id', (req, res) => {
  articles = articles.filter((article) => article.id !== parseInt(req.params.id));
  res.json({ message: 'Article deleted' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
