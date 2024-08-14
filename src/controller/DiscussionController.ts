import type { Request, Response } from 'express';
import type { DiscussionType } from '../type/DiscussionType';
import type { MessageType } from '../type/MessageType';
import { users } from './UsersController';

const discussions: DiscussionType[] = [];

/**
 * @swagger
 * /discussions/{userId}:
 *   get:
 *     summary: Retrieve discussions of a user
 *     tags: [Discussions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of discussions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Discussion'
 */
export const getDiscussionOfUser = (req: Request, res: Response) =>
  res.json(
    discussions.filter((discussion) => discussion.members.some((member) => member.id === parseInt(req.params.userId)))
  );

/**
 * @swagger
 * /discussions/{userId}/{otherId}:
 *   get:
 *     summary: Retrieve discussion between two users
 *     tags: [Discussions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: otherId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The discussion between the users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discussion'
 */
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

/**
 * @swagger
 * /discussions/{discussionId}/messages:
 *   post:
 *     summary: Post a message to a discussion
 *     tags: [Discussions]
 *     parameters:
 *       - in: path
 *         name: discussionId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: The created message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
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
