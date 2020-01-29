import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from 'ngx-strongly-typed-forms';
import {AchievementsService} from '../../../app/services/achievements.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {environment} from '../../../../environments/environment';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {PostAchievement} from 'src/modules/app/models/achievement/post-achievement';
import {Achievement} from 'src/modules/app/models/achievement/achievement';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-achievement',
  templateUrl: './edit-achievement.component.html',
  styleUrls: ['./edit-achievement.component.scss']
})
export class EditAchievementComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  form: FormGroup<PostAchievement>;
  iconUrl: string;

  constructor(
    private fb: FormBuilder,
    private achievementService: AchievementsService,
    public dialog: MatDialogRef<EditAchievementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Achievement) {
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
      name: [this.data.name, Validators.required],
      description: [this.data.description, Validators.required],
      xp: [+this.data.xp, [Validators.required, Validators.pattern('^[0-9]+$')]],
      icon: this.data.iconId
    });
    this.iconUrl = `${environment.apiUrl}/api/files/${this.data.iconId}`;
  }

  public onSelectFile(event: any) {
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
      this.achievementService.updateAchievementById(this.data.id, this.form.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
          this.dialog.close(res);
        });
    }
  }
}
