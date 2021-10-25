import { Message } from './../../../../../../shared/models/message.model';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../../../../../shared/models/user.model';
import { createMessageSuccess, createUserSuccess, deleteMessageSuccess, deleteUserSuccess,  loadMessageSuccess,  loadUsers, loadUsersSuccess, loginUserSuccess, selectMessageAction, selectUserAction,  updateUserSuccess } from '../../actions/user/user.actions';


export const userFeatureKey = 'user';
export const messageFeatureKey = 'message';


export interface State {
  users: User[];
  selectedUser: User | null;
  messages: Message[],
 
 

}

export const initialState: State = {
  users: [],
  selectedUser: null,
  messages: [],
  
};


export const reducer = createReducer(
  initialState,

  on(loadUsersSuccess, (state, action) => {
    return { ...state, users: action.data }
  }),
  on(selectUserAction, (state, action) => {
    return { ...state, selectedUser: action.data }
  }),
  on(updateUserSuccess, (state, action) => {
    return {...state, users: state.users.map(user => user._id === action.data._id ? action.data : user)}
  }),
 
  on(deleteUserSuccess, (state, action) => {
    return {...state, users: state.users.filter(user => user._id !== action.data._id)}
  }),
  
  on(loadMessageSuccess, (state, action) => {
    return { ...state, message: action.data }
  }),
  on(createMessageSuccess, (state, action) => {
    const messages = [...state.messages];
    messages.push(action.data);
    return {...state, messages}
  }),
  // on(updateMessageSuccess, (state, action) => {
  //   return {...state, messages: state.message.map(message => message._id === action.data._id ? action.data : message)}
  // }),

  on(deleteMessageSuccess, (state, action) => {
    return {...state, messages: state.messages.filter(message => message._id !== action.data._id)}
  }),
  
  on(createUserSuccess, (state, action) => {
    const users = [...state.users];
    users.push(action.data);
    return {...state, users}
  }),
  on(selectMessageAction, (state, action) => {
    return { ...state, selectedMessage: action.data }
  }),

 
  
);

