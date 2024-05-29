import type { MessageType } from './MessageType';
import type { UserType } from './UserType';

export type DiscussionType = {
  id: number | null | undefined;
  members: UserType[];
  messages: MessageType[];
};
