import cors from 'cors';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
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

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Arosa'je API",
      version: '1.0.0',
      description: "API documentation for Arosa'je"
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
    components: {
      schemas: {
        Article: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            title: {
              type: 'string'
            },
            content: {
              type: 'string'
            }
            // Add other properties as needed
          }
        },
        Discussion: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            members: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User'
              }
            },
            messages: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Message'
              }
            }
          }
        },
        Message: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            discussionId: {
              type: 'integer'
            },
            content: {
              type: 'string'
            }
            // Add other properties as needed
          }
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            name: {
              type: 'string'
            }
            // Add other properties as needed
          }
        },
        Plant: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            name: {
              type: 'string'
            },
            owner: {
              $ref: '#/components/schemas/User'
            }
            // Add other properties as needed
          }
        }
      }
    }
  },
  tags: [
    {
      name: 'Articles',
      description: 'Operations related to articles'
    },
    {
      name: 'Discussions',
      description: 'Operations related to discussions'
    },
    {
      name: 'Plants',
      description: 'Operations related to plants'
    },
    {
      name: 'Users',
      description: 'Operations related to users'
    }
  ],
  apis: ['./src/controller/*.ts'] // Path to the API docs
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, () => console.log('Server running on port 3000'));
