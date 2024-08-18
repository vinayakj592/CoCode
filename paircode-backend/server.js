import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import codeRoutes from './routes/codeRoutes.js';
import codeSocket from './sockets/codeSocket.js';

const app = express();
const server = http.createServer(app);

// Configure CORS for Express
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://cocode-482d.onrender.com', 'https://main--cocodes.netlify.app'],
  methods: ['GET', 'POST'],
  credentials: true
}));

// Setup Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://cocode-482d.onrender.com', 'https://main--cocodes.netlify.app'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(express.json());

// Routes
app.use('/api', codeRoutes);

// Socket.IO setup
codeSocket(io); 

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));