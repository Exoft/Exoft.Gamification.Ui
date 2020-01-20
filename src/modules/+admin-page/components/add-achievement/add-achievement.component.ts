import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from 'ngx-strongly-typed-forms';
import {Validators} from '@angular/forms';
import {AchievementsService} from '../../../app/services/achievements.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Subject} from 'rxjs';
import {PostAchievement} from 'src/modules/app/models/achievement/post-achievement';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-add-achievement',
  templateUrl: './add-achievement.component.html',
  styleUrls: ['./add-achievement.component.scss']
})
export class AddAchievementComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject();
  public addAchievementFormGroup: FormGroup<PostAchievement>;
  public iconUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private achievementService: AchievementsService,
    public dialog: MatDialogRef<AddAchievementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
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
      this.addAchievementFormGroup.controls.icon.setValue(event.target.files[0]);
      this.addAchievementFormGroup.controls.icon.updateValueAndValidity(); 

      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = () => {
        this.iconUrl = fileReader.result.toString();
      };
    }
  }

  public onSaveChanges() {    
    if (this.addAchievementFormGroup.valid) {
      this.achievementService.addNewAchievement(this.addAchievementFormGroup.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
        this.dialog.close(res);
      });
    }
  }

  private initializeForm() {
    this.addAchievementFormGroup = this.formBuilder.group<PostAchievement>({
      name: ['', Validators.required],
      description: ['', Validators.required],
      xp: [0, Validators.required],
      icon: null
    });
  }
}
