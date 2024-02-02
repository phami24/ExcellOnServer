import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromRoot from '../../../State/index';
import * as fromUser from '../../../State/client';
import { initFlowbite } from 'flowbite';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedOut!: boolean;
  userEmail$: Observable<string> = new Observable();
  randomAvatarPath: string = '';
  constructor(
    private store: Store<fromRoot.IAppState>,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    initFlowbite();
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      this.userEmail$ = new Observable((observer) => {
        observer.next(userEmail);
      });
    }

    this.store.select(fromUser.getIsLoggedOut).subscribe((isLoggedOut) => {
      this.isLoggedOut = isLoggedOut;
    });

    this.randomAvatarPath = this.getRandomAvatar();
  }
  logout() {
    const confirmLogout = confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      this.toastr.success('Logout Successfully!', 'Success');
      this.store.dispatch(new fromUser.Logout());
      this.router.navigate(['/home']);
    }
  }
  avatarImages: string[] = [
    '../../../assets/images/Customer1.jpg',
    '../../../assets/images/Customer2.jpg',
    '../../../assets/images/Customer3.jpg',
    '../../../assets/images/Customer4.jpg',
    '../../../assets/images/Customer5.jpg',
  ];

  getRandomAvatar(): string {
    const randomIndex = Math.floor(Math.random() * this.avatarImages.length);
    return this.avatarImages[randomIndex];
  }
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
}
