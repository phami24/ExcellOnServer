import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/admin/services/message/message.service';
import { Group } from 'src/app/interfaces/group';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  public user?: any;
  public group?: Group;
  public message?: Message[];
  public messageContent: string = '';
  constructor(private messageService: MessageService) { }
  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    if (email != null) {
      console.log(email);
      this.messageService.createChatConnection(email.toString());
      this.getUser();
      if (this.group != null) {
        console.log("Employee : " + this.group);
      }
    }
    this.messageService.currentMessages.subscribe(messages => this.message = messages);
  }
  closePopup() {
    const popup = window.document.getElementById('myPopup');
    if (popup) {
      popup.style.display = 'none';
    }
  }
  clickPopup() {
    const popup = window.document.getElementById('myPopup');
    if (popup) {
      popup.style.display = 'block';
    }
    this.getMessage();
  }

  getUser(): void {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      this.messageService.getUserProfileByJwt(jwt).subscribe(
        (response: any) => {
          this.user = response.userProfile;
          console.log(this.user.id);
          this.getGroupChatByUserId(this.user.id);
        },
        error => {
          console.error('Error fetching employee profile:', error);
        }
      );
    } else {
      console.error('JWT token not found in local storage.');
    }
  }
  getGroupChatByUserId(id: number): void {
    this.messageService.getGroupByClientId(id).subscribe(
      (response) => {
        this.group = response;
        console.log(this.group);
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );
  }

  getMessage(): void {
    if (!this.group) {
      console.error('No group selected.');
      return;
    }
    this.messageService.getAllMessageByGroupName(this.group.groupName).subscribe(
      (response: Message[]) => {
        this.message = [];
        this.message = response;
        console.log(this.message);
      },
      error => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  sendChatMessage(messageContent: string) {
    if (!messageContent.trim()) {
      return;
    }
    if (this.group != null) {
      console.log(this.group.customerEmail + " " + this.group.employeeEmail);
      console.log(messageContent);
      const message: Message = {
        groupName: this.group.groupName,
        content: messageContent,
        senderUserName: this.group.customerEmail,
        reciveUserName: this.group.employeeEmail
      };

      this.messageService.sendMessage(message).then((response) => {
        this.message?.push(response);
        if(this.message)
        this.messageService.updateMessages(this.message);
        this.messageContent = '';
      }).catch(error => {
        console.error('Error sending message:', error);
        // Handle error as needed
      });
    }
  }
}
