import { Post } from './../../../../shared/models/post.model';
import { Message } from './../../../../shared/models/message.model';
import { User } from "../../../../shared/models/user.model"


export type Postable = User | Post | Message| Partial<User>