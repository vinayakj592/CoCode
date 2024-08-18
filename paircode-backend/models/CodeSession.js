import mongoose from 'mongoose';

const CodeSessionSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  code: { type: String, default: '' }
});

const CodeSession = mongoose.model('codesessions', CodeSessionSchema);
export default CodeSession;