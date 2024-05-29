import cors from 'cors';
import express from 'express';
import * as ArticlesController from './controller/ArticlesController';
import * as DiscussionController from './controller/DiscussionController';
import * as PlantsController from './controller/PlantsController';
import * as UsersController from './controller/UsersController';

export const app = express();
app.use(express.json());
app.use(cors());

// Plants
app.get('/plants', PlantsController.getPlants);
app.get('/plants/:userId', PlantsController.getUserPlants);
app.post('/plants', PlantsController.postPlant);
app.put('/plants/:id', PlantsController.putPlant);
app.delete('/plants/:id', PlantsController.deletePlant);

// Users
app.post('/auth', UsersController.isUser);
app.get('/users', UsersController.getUsers);
app.get('/users/:id', UsersController.getUserById);
app.post('/users', UsersController.postUser);
app.put('/users/:id', UsersController.putUser);
app.delete('/users/:id', UsersController.deleteUser);

// Articles
app.get('/articles', ArticlesController.getArticles);
app.post('/articles', ArticlesController.postArticle);
app.put('/articles/:id', ArticlesController.putArticle);
app.delete('/articles/:id', ArticlesController.deleteArticle);

// discussions
app.get('/discussions/:userId', DiscussionController.getDiscussionOfUser);
app.get('/discussions/:userId/:otherId', DiscussionController.getDiscussionBetweenUsers);
app.post('/discussions/:discussionId/messages', DiscussionController.postMessages);

app.listen(3000, () => console.log('Server running on port 3000'));
