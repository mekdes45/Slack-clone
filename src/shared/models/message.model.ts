
import * as mongoose from 'mongoose';
export interface Message {
    _id?:{type: mongoose.Types.ObjectId}
    sender: string,
    to?: string,
    text: string,
}