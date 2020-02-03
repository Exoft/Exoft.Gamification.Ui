import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadSpinnerService {
  private isSpinnerShown = new BehaviorSubject(false);


  showSpinner() {
    this.isSpinnerShown.next(true);
  }

  hideSpinner() {
    this.isSpinnerShown.next(false);
  }

  getSpinnerStatus() {
    return this.isSpinnerShown.asObservable();
  }
}
