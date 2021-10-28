import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const messageSchema = new Schema({
    sender: { type: String, required: true },
    to: { type: String },
    text: { type: String, required: true },
});
export const MessageModel = model('Message', messageSchema);
//# sourceMappingURL=message.schemas.js.map