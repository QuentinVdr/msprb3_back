import type { Request, Response } from 'express';
import type { ArticleType } from '../type/ArticleType';
import { defaultArticles } from '../value/article';

let articles: ArticleType[] = [...defaultArticles];

export const getArticles = (req: Request, res: Response) => {
  res.json(articles);
};

export const postArticle = (req: Request, res: Response) => {
  const newArticle = req.body;
  articles.push(newArticle);
  res.json(newArticle);
};

export const putArticle = (req: Request, res: Response) => {
  const updatedArticle = req.body;
  articles = articles.map((article) => (article.id === parseInt(req.params.id) ? updatedArticle : article));
  res.json(updatedArticle);
};

export const deleteArticle = (req: Request, res: Response) => {
  articles = articles.filter((article) => article.id !== parseInt(req.params.id));
  res.json({ message: 'Article deleted' });
};
