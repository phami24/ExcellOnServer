import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environments/environment';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) {}

  
  addCart(clientId: number, serviceChargeId: number): Observable<any> {
    const data = {
      clientId: clientId,
      serviceChargeId: serviceChargeId
    };

    return this.httpClient.post<any>(`${baseUrl}/Cart/add-to-cart`, data);
  } 
  getCartByClientId(clientId: number): Observable<any> {
    const url = `${baseUrl}/Cart/getByCustomerId/${clientId}`;
    return this.httpClient.get(url);
  }
}
