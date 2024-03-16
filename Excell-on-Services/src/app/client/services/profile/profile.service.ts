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

  GetProfileByJwt(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'accept': '*'
    });

    const url = `${baseUrl}/Auth/GetEmployeeProfileByJwt?token=${token}`;
    return this.httpClient.post(url, {}, { headers });
  }
}
