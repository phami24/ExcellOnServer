import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environments/environment';

const baseUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  // GetProfileByJwt(newService: any): Observable<any> {
  //   const token = localStorage.getItem('tokenAdmin');
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   });

  //   return this.httpClient.post<any>(`${baseUrl}/Auth/GetEmployeeProfileByJwt`, newService, { headers });
  // }

  GetProfileByJwt(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'accept': '*'
    });

    const url = `${baseUrl}/Auth/GetEmployeeProfileByJwt?token=${token}`;
    return this.httpClient.post(url, {}, { headers });
  }
}
