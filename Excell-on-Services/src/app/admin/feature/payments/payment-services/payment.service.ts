import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://localhost:7260/api';

  constructor(private http: HttpClient) {}

 
  private addTokenToHeader(): HttpHeaders {
    const token = localStorage.getItem('tokenAdmin');
    if (!token) {
      // Handle the case where the token is not present
      console.warn('Token not found in localStorage');
      return new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getClient(): Observable<any[]> {
    const headers = this.addTokenToHeader();
    
    return this.http
      .get<any[]>(`${this.apiUrl}/Client`, { headers: headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching departments:', error);
          return throwError('Error fetching departments');
        })
      );
  }

  createPaymentIntent(paymentIntentDto: any): Observable<any> {
    const headers = this.addTokenToHeader();

    return this.http.post<any>(`${this.apiUrl}/payment/create-payment-intent`, paymentIntentDto,{ headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  confirmPayment(confirmPaymentDto: any): Observable<any> {
    const headers = this.addTokenToHeader();

    return this.http.post<any>(`${this.apiUrl}/payment/confirm-payment`, confirmPaymentDto,{ headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  searchClientByName(name: string): Observable<any> {
    const headers = this.addTokenToHeader();
    const url = `${this.apiUrl}/Client/search?name=${name}`;
    return this.http.get(url, { headers });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Xảy ra lỗi mạng hoặc lỗi client-side
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend trả về một response không thành công
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Trả về một observable với thông điệp lỗi cho component gọi
    return throwError('Something bad happened; please try again later.');
  }

  

}
