import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from 'ngx-strongly-typed-forms';
import {AchievementsService} from '../../../app/services/achievements.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {environment} from '../../../../environments/environment';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {PostAchievement} from 'src/modules/app/models/achievement/post-achievement';
import {Achievement} from 'src/modules/app/models/achievement/achievement';

@Component({
  selector: 'app-edit-achievement',
  templateUrl: './edit-achievement.component.html',
  styleUrls: ['./edit-achievement.component.scss']
})
export class EditAchievementComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject();
  public editAchievementFormGroup: FormGroup<PostAchievement>;
  public iconUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private achievementService: AchievementsService,
    public dialog: MatDialogRef<EditAchievementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Achievement) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.editAchievementFormGroup.controls.icon.setValue(event.target.files[0]);
      this.editAchievementFormGroup.controls.icon.updateValueAndValidity(); 

      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = () => {
        this.iconUrl = fileReader.result.toString();
      };
    }
  }

  onSaveChanges() {
    if (this.editAchievementFormGroup.valid) {
      this.achievementService.updateAchievementById(this.data.id, this.editAchievementFormGroup.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
          this.dialog.close(res);
        });
    }
  }

  private initializeForm() {
    this.editAchievementFormGroup = this.formBuilder.group<PostAchievement>({
      name: this.data.name,
      description: this.data.description,
      xp: +this.data.xp,
      icon: null
    });
    this.iconUrl = `${environment.apiUrl}/api/files/${this.data.iconId}`;
  }
}