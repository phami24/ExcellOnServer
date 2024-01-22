import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent {
  closePopup() {    
    const popup = window.document.getElementById('myPopup');
    if (popup) {
      popup.style.display = 'none'; 
    }
  }
  clickPopup(){
    const popup = window.document.getElementById('myPopup');
    if(popup){
      popup.style.display = 'block';
    }
  }
}
