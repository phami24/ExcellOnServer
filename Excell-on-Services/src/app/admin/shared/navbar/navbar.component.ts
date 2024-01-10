import { Component, OnInit } from '@angular/core';
import * as fromUser from '../../../store/user/admin.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userState$!: Observable<fromUser.IUserState | undefined>; 

  constructor(private store: Store<fromUser.IUserState>) {}

  ngOnInit(): void {
    this.userState$ = this.store.select(fromUser.selectUser);
  }
}