import {Component} from '@angular/core';
import {LoadSpinnerService} from '../../services/load-spinner.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(readonly spinnerService: LoadSpinnerService) {
  }
}
