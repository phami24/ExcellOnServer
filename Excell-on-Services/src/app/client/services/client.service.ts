import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Banner } from 'src/app/interfaces/banner';



const baseUrl = 'http://localhost:5097/api/Banners';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getBanner(): Observable<Banner[]> {
    return this.http.get<Banner[]>(baseUrl);
  }
}
