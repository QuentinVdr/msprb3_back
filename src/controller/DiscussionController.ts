import type { Request, Response } from 'express';
import type { DiscussionType } from '../type/DiscussionType';
import type { MessageType } from '../type/MessageType';
import { users } from './UsersController';

let discussions: DiscussionType[] = [];

export const getDiscussionOfUser = (req: Request, res: Response) =>
  res.json(
    discussions.filter((discussion) => discussion.members.some((member) => member.id === parseInt(req.params.userId)))
  );

export const getDiscussionBetweenUsers = (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const otherId = parseInt(req.params.otherId);
  const discussion = discussions.find(
    (discussion) =>
      discussion.members.some((member) => member.id === userId) &&
      discussion.members.some((member) => member.id === otherId)
  );
  if (!discussion) {
    const newDiscussion: DiscussionType = {
      id: discussions.length || 1,
      members: users.filter((user) => user.id === userId || user.id === otherId),
      messages: []
    };
    discussions.push(newDiscussion);
    res.json(discussions);
    return;
  }
  res.json(discussion);
};

export const postMessages = (req: Request, res: Response) => {
  const discussionId = parseInt(req.params.discussionId);
  const newMessage = req.body.message;
  newMessage.discussionId = discussionId;
  let discussionMessage = discussions.find((discussion) => discussion.id === discussionId)?.messages as MessageType[];
  newMessage.id = discussionMessage?.length || 1;
  discussionMessage = discussionMessage ? [...discussionMessage, newMessage] : [newMessage];
  discussions.forEach((discussion) => {
    if (discussion.id === discussionId) {
      discussion.messages = discussionMessage;
    }
  });
  res.json(newMessage);
};
