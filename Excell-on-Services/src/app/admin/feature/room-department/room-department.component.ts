import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-room-department',
  templateUrl: './room-department.component.html',
  styleUrls: ['./room-department.component.css']
})
export class RoomDepartmentComponent {
  @Input() roomName!: string;

}
