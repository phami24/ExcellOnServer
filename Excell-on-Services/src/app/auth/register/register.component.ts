import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';
import { beginRegister, showalert } from '../user/user.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private builder:FormBuilder, private store:Store){

  }

  registerform=this.builder.group({
    firstName:this.builder.control('',Validators.compose([Validators.required, Validators.minLength(5)])),
    lastName:this.builder.control('',Validators.compose([Validators.required, Validators.minLength(5)])),
    phone:this.builder.control('',Validators.compose([Validators.required, Validators.minLength(5)])),
    email:this.builder.control('',Validators.compose([Validators.required, Validators.email])),
    password:this.builder.control('',Validators.compose([Validators.required, Validators.minLength(5)])),
    confirmpassword: this.builder.control('', Validators.required),
    gender:this.builder.control('male'),
  })
  Proceedregister(){
    if(this.registerform.valid){
      if(this.registerform.value.password === this.registerform.value.confirmpassword){
        const _userobj: User = {
          firstName: this.registerform.value.firstName as string,
          lastName: this.registerform.value.lastName as string,
          password: this.registerform.value.password as string,
          email: this.registerform.value.email as string,
          phone: this.registerform.value.phone as string,
          gender: this.registerform.value.gender as string,
          role: 'user',
          status: true
        }
        this.store.dispatch(beginRegister({ userdata: _userobj }))
      }
      else {
        this.store.dispatch(showalert({ message: 'Password mismatch', resulttype: 'fail' }))
      }
    }
  }
}
