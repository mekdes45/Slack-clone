import { Message } from './../../../../../../shared/models/message.model';
import { reducer } from './../../reducers/user/user.reducer';
import { createFeatureSelector, createSelector, createReducer } from '@ngrx/store';
import { AppState } from '../..';
import * as fromUser from '../../reducers/user/user.reducer';


const userFeatureSelector = createFeatureSelector<AppState, fromUser.State>(fromUser.userFeatureKey);

export const usersSelector = createSelector(
  userFeatureSelector,
  (state) => state.users
);

export const selectedUserSelector = createSelector(
  userFeatureSelector,
  (state) => state.selectedUser
)

