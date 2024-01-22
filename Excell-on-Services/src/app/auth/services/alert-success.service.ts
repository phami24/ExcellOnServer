import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertSuccessService {

  private alertSubject = new BehaviorSubject<{ title: string; message: string } | null>(null);
  alert$ = this.alertSubject.asObservable();

  showSuccessAlert(title: string, message: string): void {
    this.alertSubject.next({ title, message });
  }
}
