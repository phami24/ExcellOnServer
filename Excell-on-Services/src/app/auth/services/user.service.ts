import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  
  APIBaseUrl = 'http://localhost:5097/api/UserLoginRequetsDtoes'

  UserRegistration(userdata:User){
    return this.http.post(this.APIBaseUrl, userdata);
  }
}
