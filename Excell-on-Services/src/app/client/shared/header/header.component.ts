import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../../State/index';
import * as fromUser from '../../../State/client';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedOut!: boolean;
  userEmail$: Observable<string> = new Observable();
  constructor(
    private store: Store<fromRoot.IAppState>,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    initFlowbite();
    this.userEmail$ = this.store.select(fromUser.getUserEmail);
    this.store.select(fromUser.getIsLoggedOut).subscribe((isLoggedOut) => {
      this.isLoggedOut = isLoggedOut;
    });
  }
  logout() {
    this.store.dispatch(new fromUser.Logout());
  }
}
