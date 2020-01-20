import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from 'ngx-strongly-typed-forms';
import {AchievementsService} from '../../../app/services/achievements.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MapperService} from '../../../app/services/mapper.service';
import {environment} from '../../../../environments/environment';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {PostAchievement} from 'src/modules/app/models/achievement/post-achievement';

@Component({
  selector: 'app-edit-achievement',
  templateUrl: './edit-achievement.component.html',
  styleUrls: ['./edit-achievement.component.scss']
})
export class EditAchievementComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject();
  public environment = environment;
  public editAchievementFormGroup: FormGroup<PostAchievement>;
  public achievementId: string;
  public iconUrl: string;
  public iconId: string;

  constructor(
    private formBuilder: FormBuilder,
    private mapperService: MapperService,
    private achievementService: AchievementsService,
    public dialog: MatDialogRef<EditAchievementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.initializeForm();
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
      this.achievementService.updateAchievementById(this.achievementId, this.editAchievementFormGroup.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
          this.dialog.close(res);
        });
    }
  }

  private initializeForm(){
    let achievement = this.mapperService.getAchievement(this.data.achievement);
    this.achievementId = achievement.get('id').value;
    this.iconId = achievement.get('iconId').value;
    this.editAchievementFormGroup = this.formBuilder.group<PostAchievement>({
      name: achievement.controls.name,
      description: achievement.controls.description,
      xp: achievement.controls.xp,
      icon: achievement.controls.iconId
    });
    this.iconUrl = `${this.environment.apiUrl}/api/files/${this.iconId}`;
  }
}
