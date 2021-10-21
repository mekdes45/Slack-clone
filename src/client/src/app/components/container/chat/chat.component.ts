
import {Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {ChatService} from '../../../services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  user = '';
  messageText = '';
  room='';


  messageArray: Array<{user: String , message: String }> = [];
  constructor(private chatService: ChatService, private userService:UserService){
    this.chatService.newUserJoined()
      .subscribe((data: { user: String; message: String; }) => this.messageArray.push(data));


    this.chatService.userLeftRoom()
      .subscribe((data: { user: String; message: String; }) => this.messageArray.push(data));

    this.chatService.newMessageReceived()
      .subscribe((data: { user: String; message: String; }) => this.messageArray.push(data));
  }

  join(){
      this.chatService.joinRoom({user: this.user, room: this.room});
  }

  leave(){
    this.chatService.leaveRoom({user: this.user, room: this.room});
  }
 
  sendMessage()
  {
    this.chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
    
    this.userService.createMessage({
      sender: this.user,
      text: this.messageText
          }).subscribe();
      
  }
  
}


  