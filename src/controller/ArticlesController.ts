import type { Request, Response } from 'express';
import type { ArticleType } from '../type/ArticleType';
import { defaultArticles } from '../value/article';

let articles: ArticleType[] = [...defaultArticles];

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Retrieve a list of articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
export const getArticles = (req: Request, res: Response) => {
  res.json(articles);
};

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: The created article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 */
export const postArticle = (req: Request, res: Response) => {
  const newArticle = req.body;
  articles.push(newArticle);
  res.json(newArticle);
};

/**
 * @swagger
 * /articles/{id}:
 *   put:
 *     summary: Update an existing article
 *     tags: [Articles]
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
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: The updated article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 */
export const putArticle = (req: Request, res: Response) => {
  const updatedArticle = req.body;
  articles = articles.map((article) => (article.id === parseInt(req.params.id) ? updatedArticle : article));
  res.json(updatedArticle);
};

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete an article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A message indicating the article was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export const deleteArticle = (req: Request, res: Response) => {
  articles = articles.filter((article) => article.id !== parseInt(req.params.id));
  res.json({ message: 'Article deleted' });
};
