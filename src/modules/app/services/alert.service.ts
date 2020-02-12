import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Alert} from '../models/alert';
import {AlertType} from '../enums/alert-type';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();

  private alert(type: AlertType, message: string) {
    this.subject.next({ type, message } as Alert);
  }

  public notify(): Observable<Alert> {
    return this.subject.asObservable();
  }

  public success(message: string) {
    this.alert(AlertType.Success, message);
  }

  public error(message = 'An error occurred. Please try again later.') {
    this.alert(AlertType.Error, message);
  }
}
