import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-alert-success',
  templateUrl: './alert-success.component.html',
  styleUrls: ['./alert-success.component.css']
})
export class AlertSuccessComponent {
  @Input() show: boolean = false;
  @Input() message: string = '';
}
