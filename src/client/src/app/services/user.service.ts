import { deleteMessage } from 'src/app/store/actions/user/user.actions';
import { updateMessage } from './../store/actions/user/user.actions';
// import { Message } from './../../../../shared/models/message.model';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { User } from '../../../../shared/models/user.model';
import { Message } from '../../../../shared/models/message.model';
import { Post } from '../../../../shared/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  selectedUserId = '';
 

  constructor(private api: ApiService) {}

  getUsers() {
    return this.api.get<{ data: User[] }>('users').pipe(map(res => res.data));
  }
  createUser(user: User) {
    return this.api.post<{data: User}>('create-user', user).pipe(map(res => res.data));
}
  getMessages() {
    return this.api.get<{ data: Message[] }>('messages').pipe(map(res => res.data));
  }
  createMessage(message: Message) {
    return this.api.post<{data: Message}>('create-message', message).pipe(map(res => res.data));
  }
  getPost() {
    return this.api.get<{ data: Post[] }>('Posts').pipe(map(res => res.data));
  }

  createPost(post: Post) {
    return this.api.post<{data: Post}>('create-post', post).pipe(map(res => res.data));
}
  login(user: Partial<User>) {
    return this.api.post<{data: User}>('login', user).pipe(map(res => res.data));
  }
  
  updateUser(user: User) {
      return this.api.put<User>('update-user/' + user._id, user);
  }
  updateMessage(message: Message) {
    return this.api.put<Message>('update-message/' + message._id, message);
}

  deleteUser(user: User) {
    return this.api.delete<{data: User}>('delete-user/' + user._id).pipe(map(res => res.data));
  }

  deleteMessage(message: Message) {
    return this.api.delete<{data: Message}>('delete-message/' + message._id).pipe(map(res => res.data));
  }

  selectUser(id: string) {
    this.selectedUserId = id
      ;
  }
   
}
