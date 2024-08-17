import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import CodeSession from '../models/CodeSession.js';

const router = express.Router();

// Create a new session
router.post('/create', async (req, res) => {
  const roomId = uuidv4();
  const newSession = new CodeSession({ roomId });
  await newSession.save();
  res.json({ roomId });
});

// Get code for a session
router.get('/:roomId', async (req, res) => {
  const { roomId } = req.params;
  const session = await CodeSession.findOne({ roomId });
  if (!session) return res.status(404).send('Room not found');
  res.json({ code: session.code });
});

export default router;