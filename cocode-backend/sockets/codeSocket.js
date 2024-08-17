import CodeSession from '../models/CodeSession.js';

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected');

    //Join a room
    socket.on('joinRoom', async (roomId) => {
      if (!roomId) {
        console.error('No roomId provided');
        return;
      }
      
      socket.join(roomId);
    
      // Check if a session with this roomId already exists
      let session = await CodeSession.findOne({ roomId });
    
      // If no session exists, create a new one
      if (!session) {
        session = new CodeSession({ roomId });
        await session.save();
      }
    
      // Emit the existing or new session's code
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