import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/app/Environments/environment';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private cartDetailTotalSubject: Subject<number> = new Subject<number>();
  cartDetailTotal$: Observable<number> =
    this.cartDetailTotalSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  updateCartDetailTotal(total: number): void {
    this.cartDetailTotalSubject.next(total);
  }

  addOrder(orderData: any): Observable<any> {
    return this.httpClient.post<any>(`${baseUrl}/Order/create-order`, orderData);
  }
  addOrderDetail(orderId: number, serviceChargeId: number): Observable<any> {
    return this.httpClient.post<any>(`${baseUrl}/Order/order-detail`, { orderId, serviceChargeId });
  }

  deleteOrder(orderId: number): Observable<any> {
    const url = `${baseUrl}/Order/${orderId}`;
    return this.httpClient.delete(url);
  }
 
}