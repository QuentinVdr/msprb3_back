import type { UserType } from './UserType';

export type ArticleType = {
  id: number;
  title: string;
  description: string;
  author: UserType;
};
