import type { UserType } from '../type/UserType';

export const botanistUser: UserType = {
  id: 1,
  firstName: 'user',
  lastName: 'botanist',
  mail: 'botanist@mail.com',
  password: 'botanist',
  isBotanist: true
};

export const botanistUser2: UserType = {
  id: 2,
  firstName: 'user2',
  lastName: 'botanist',
  mail: 'botanist2@mail.com',
  password: 'botanist',
  isBotanist: true
};

export const casualUser: UserType = {
  id: 10,
  firstName: 'user',
  lastName: 'casual',
  mail: 'user@mail.com',
  password: 'user',
  isBotanist: false
};

export const casualUser2: UserType = {
  id: 11,
  firstName: 'user2',
  lastName: 'casual',
  mail: 'user2@mail.com',
  password: 'user',
  isBotanist: false
};

export const defaultUsers = [botanistUser, botanistUser2, casualUser, casualUser2];
