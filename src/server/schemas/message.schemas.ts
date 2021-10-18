import mongoose from 'mongoose';
import type {Message } from '../../shared/models/message.model';
const {Schema, model} = mongoose

const messageSchema = new Schema<Message>({
    sender: {type: String, required: true},
    to: {type: String},
    text: {type: String, required: true},
})

export const MessageModel = model<Message>('Message',messageSchema)
