import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/user/admin.actions';
// import { AppState } from '../../store/user/user.reducer';
import * as fromUser from '../../store/user/admin.reducer'; 
import { UserService } from '../../store/user/admin.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {

  loginObj: any = {
    "Email": "",
    "Password": ""
  };

  constructor(private store: Store<fromUser.IUserState>, private userService: UserService, private router : Router) {}

  ngOnInit(): void {
    // Kiểm tra ngay sau khi ứng dụng khởi chạy
    this.checkLoginStatus();
    
    // Kiểm tra nếu đã đăng nhập, chuyển hướng đến trang admin
    this.store.select(fromUser.selectUser).subscribe(userState => {
      if (userState.isLoggedIn) {
        this.router.navigateByUrl('/admin');
      }
    });
  }
  
  private checkLoginStatus(): void {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    const token = localStorage.getItem('loginToken');
    const email = localStorage.getItem('loginEmail');
    
    if (token && email) {
      // Nếu có token và email, dispatch action đăng nhập thành công
      this.store.dispatch(AuthActions.loginSuccess({ token, email }));
    
      // Chuyển hướng đến trang admin
      this.router.navigateByUrl('/admin');
    }
  }

  onLogin() {
    this.userService.login(this.loginObj.Email, this.loginObj.Password).subscribe(
      (res: any) => {
        if (res.result) {
          alert('Đăng nhập thành công');
          localStorage.setItem('loginToken', res.token);
          localStorage.setItem('loginEmail', this.loginObj.Email);


          this.store.dispatch(AuthActions.loginSuccess({ token: res.token, email: this.loginObj.Email }));
          
          this.router.navigateByUrl('/admin');
        } else {
          alert("Thông tin đăng nhập không hợp lệ");
        }
      },
      (error) => {
        console.error('Lỗi trong quá trình đăng nhập:', error);
        alert("Đã xảy ra lỗi trong quá trình đăng nhập");
      }
    );
  }
  

}
