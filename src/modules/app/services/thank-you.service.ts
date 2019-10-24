import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThankYouService {
  constructor(private http: HttpClient) {}

  getThankYouMessage() {
    return this.http.get(`${environment.apiUrl}/api/thanks`);
  }

  sendThankYouMessage(message: string, toUserId: any) {
    return this.http.post(`${environment.apiUrl}/api/thanks`, {text: message, toUserId});
  }
}
