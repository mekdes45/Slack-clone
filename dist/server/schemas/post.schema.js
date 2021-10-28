import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const postSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId }
});
export const PostModel = model('post', postSchema);
//# sourceMappingURL=post.schema.js.map