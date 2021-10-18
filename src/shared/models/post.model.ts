
import * as mongoose from 'mongoose';
import type { User } from './user.model';
export interface Post {
  
    body: string,
    title: string,
    user: {type: mongoose.Types.ObjectId} | User;
}