import type { UserType } from './UserType';

export type MessageType = {
  id: number | null | undefined;
  message: string;
  datetime: Date;
  sender: UserType;
  receiver: UserType;
};
