import mongoose from 'mongoose';
import type { Post } from '../../shared/models/post.model'

const { Schema, model } = mongoose

const postSchema = new Schema<Post>({
    title: {type: String, required: true},
    body: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId}
})

export const PostModel = model<Post>('post', postSchema); 