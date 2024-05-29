import type { UserType } from './UserType';

export type MessageType = {
  id: number | null | undefined;
  content: string;
  datetime: Date;
  sender: UserType;
  discussionId: number;
};
