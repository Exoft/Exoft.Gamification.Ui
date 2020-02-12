import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadSpinnerService} from '../../services/load-spinner.service';

@Component({
  selector: 'app-spinner-wrapper',
  templateUrl: './spinner-wrapper.component.html',
  styleUrls: ['./spinner-wrapper.component.scss']
})
export class SpinnerWrapperComponent implements OnInit, OnDestroy {
  public isSpinnerVisible = false;
  public spinnerServiceSub: any;

  constructor(private spinnerService: LoadSpinnerService) {
  }

  public ngOnInit(): void {
    this.spinnerServiceSub = this.spinnerService.getSpinnerStatus()
      .subscribe(res => {
        this.isSpinnerVisible = res;
      });
  }

  ngOnDestroy(): void {
    if (this.spinnerServiceSub) {
      this.spinnerServiceSub.unsubscribe();
    }
  }
}
