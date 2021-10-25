import { deleteMessage, deleteMessageFailure, deleteMessageSuccess, loadMessage, loadMessageFailure, loadMessageSuccess,  } from 'src/app/store/actions/user/user.actions';
import { createMessage, createMessageFailure, createMessageSuccess, loginUserFailure,
  loginUserSuccess,
  
 
 } from './../../actions/user/user.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import {
  createUser,
  createUserFailure,
  createUserSuccess,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
  loginUser,

  
  

} from '../../actions/user/user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((data) => loadUsersSuccess({ data })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );
 

  createUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      mergeMap((action) =>
        this.userService.createUser(action.data).pipe(
          map((data) => createUserSuccess({ data })),
          catchError((error) => of(createUserFailure({ error })))
        )
      )
    )
  );
    
    updateUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updateUser),
        mergeMap((action) =>
          this.userService.updateUser(action.data).pipe(
            map((data) => updateUserSuccess({ data })),
            catchError((error) => of(updateUserFailure({ error })))
          )
        )
      )
    );
  
    

  deleteUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap((action) =>
        this.userService.deleteUser(action.data).pipe(
          map((data) => deleteUserSuccess({ data })),
          catchError((error) => of(deleteUserFailure({ error })))
        )
      )
    )
  );

  createMessages$ = createEffect(() =>
      this.actions$.pipe(
        ofType(createMessage),
        mergeMap((action) =>
          this.userService.createMessage(action.data).pipe(
            map((data) => createMessageSuccess({ data })),
            catchError((error) => of(createMessageFailure({ error })))
          )
        )
      )
  );
  loadMessage$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadMessage),
    mergeMap(() =>
      this.userService.getMessages().pipe(
        map((data) => loadMessageSuccess({ data })),
        catchError((error) => of(loadMessageFailure({ error })))
      )
    )
  )
);
   
  deleteMessages$ = createEffect(() =>
  this.actions$.pipe(
    ofType(deleteMessage),
    mergeMap((action) =>
      this.userService.deleteMessage(action.data).pipe(
        map((data) => deleteMessageSuccess({ data })),
        catchError((error) => of(deleteMessageFailure({ error })))
      )
    )
  )
);

  loginUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loginUser),
    mergeMap((action) =>
      this.userService.login(action.data).pipe(
        map((data) => loginUserSuccess({ data })),
        catchError((error) => of(loginUserFailure({ error })))
      )
    )
  )
);

  constructor(private actions$: Actions, private userService: UserService) {}
}
