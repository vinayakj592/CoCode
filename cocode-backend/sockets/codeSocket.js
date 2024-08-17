import CodeSession from '../models/CodeSession.js';

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected');

    //Join a room
    socket.on('joinRoom', async (roomId) => {
      socket.join(roomId);
      let session = await CodeSession.findOne({ roomId });
      if (!session) {
        // Create a new session if it doesn't exist
        session = new CodeSession({ roomId, code: '' });
        await session.save();
      }
      socket.emit('loadCode', session.code || '');
    });
    
      

    // Handle code changes
    socket.on('codeChange', async (data) => {
      const { roomId, code } = data;
      await CodeSession.findOneAndUpdate({ roomId }, { code }, { new: true });
      socket.to(roomId).emit('codeChange', code);
    });    

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

export default socketHandler;