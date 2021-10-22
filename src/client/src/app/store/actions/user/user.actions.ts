import { map } from 'rxjs/operators';
import { Message } from './../../../../../../shared/models/message.model';
import { createAction, props } from '@ngrx/store';
import { Error } from 'mongoose';
import { User } from '../../../../../../shared/models/user.model';

export const loadUsers = createAction(
  '[User] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: Error }>()
);


export const loadMessages = createAction(
  '[Message] Load Message',
);

export const loadMessagesSuccess = createAction(
  '[Message] Load Message Success',
  props<{ data: Message[] }>()
);

export const loadMessagesFailure = createAction(
  '[Message] Load Message Failure',
  props<{ error: Error }>()
);

export const selectUserAction = createAction(
  '[User] Select User',
  props<{ data: User | null }>()
);
export const selectMessageAction = createAction(
  '[Message] Select Message',
  props<{ data: Message | null }>()
);

export const createUser = createAction(
  '[User] Create User',
  props<{data: User}>()
);

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ data: User }>()
);

export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: Error }>()
);


export const createMessage = createAction(
  '[Message] Create Message',
  props<{data: Message}>()
);

export const createMessageSuccess = createAction(
  '[Message] Create Message Success',
  props<{ data: Message}>()
);

export const createMessageFailure = createAction(
  '[Message] Create Message Failure',
  props<{ error: Error }>()
);


// export const updateMessage = createAction(
//   '[Message] Update Message',
//   props<{data: Message}>()
// );

// export const updateMessageSuccess = createAction(
//   '[Message] Update Message Success',
//   props<{ data: Message }>()
// );

// export const updateMessageFailure = createAction(
//   '[Message] Update Message Failure',
//   props<{ error: Error }>()
// );

export const deleteMessage = createAction(
  '[Message] Delete Message',
  props<{data: Message}>()
);

export const deleteMessageSuccess = createAction(
  '[Message] Delete Message Success',
  props<{ data: Message }>()
);

export const deleteMessageFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: Error }>()
);
export const updateUser = createAction(
  '[User] Update User',
  props<{data: User}>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ data: User }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: Error }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{data: User}>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ data: User }>()
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: Error }>()
);


export const loginUser = createAction(
  '[User] Login User',
  props<{data: Partial<User>}>()
);

export const loginUserSuccess = createAction(
  '[User] Login User Success',
  props<{ data: User }>()
);

export const loginUserFailure = createAction(
  '[User] Login User Failure',
  props<{ error: Error }>()
);