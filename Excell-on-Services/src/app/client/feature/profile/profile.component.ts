import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ProfileService } from '../../services/profile/profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  token: string | null = localStorage.getItem('token');
  userProfile: any;
  userEmail$: Observable<string> = new Observable();

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    initFlowbite();
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      this.userEmail$ = new Observable((observer) => {
        observer.next(userEmail);
      });
    }

    if (this.token !== null) {
      this.profileService.GetProfileByJwt(this.token).subscribe(
        (response) => {
          this.userProfile = response.userProfile;
          console.log(this.userProfile);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Token is null. Handle this case appropriately.');
    }
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 3; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
