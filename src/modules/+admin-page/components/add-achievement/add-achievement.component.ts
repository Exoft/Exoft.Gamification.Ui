import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from 'ngx-strongly-typed-forms';
import {Validators} from '@angular/forms';
import {AchievementsService} from '../../../app/services/achievements.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {PostAchievement} from 'src/modules/app/models/achievement/post-achievement';
import {finalize, takeUntil} from 'rxjs/operators';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {AlertService} from '../../../app/services/alert.service';


@Component({
  selector: 'app-add-achievement',
  templateUrl: './add-achievement.component.html',
  styleUrls: ['./add-achievement.component.scss']
})
export class AddAchievementComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  form: FormGroup<PostAchievement>;
  iconUrl: string;

  constructor(
    private fb: FormBuilder,
    private achievementService: AchievementsService,
    private dialog: MatDialogRef<AddAchievementComponent>,
    private readonly loadSpinnerService: LoadSpinnerService,
    private readonly alertService: AlertService) {
  }

  ngOnInit() {
    this.setForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private setForm() {
    this.form = this.fb.group<PostAchievement>({
      name: ['', Validators.required],
      description: ['', Validators.required],
      xp: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      icon: [null, Validators.required]
    });
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.form.controls.icon.setValue(event.target.files[0]);
      this.form.controls.icon.updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = () => {
        this.iconUrl = fileReader.result.toString();
      };
    }
  }

  onSaveChanges() {
    if (this.form.valid) {
      this.loadSpinnerService.showSpinner();
      this.achievementService.addNewAchievement(this.form.value)
        .pipe(finalize(() => this.loadSpinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
        .subscribe(res => {
          this.dialog.close(res);
          this.alertService.success('Achievement was successfully added!');
        },
          error => this.alertService.error());
    }
  }
}
