
import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent {
  @Output() userNameEvent = new EventEmitter<string>();

  userName = '';
  message = '';

  constructor() { }

  setUserName(): void {
    this.userNameEvent.emit(this.userName);
    // this.messageEvent.emit(this.message);
  }
 
}
