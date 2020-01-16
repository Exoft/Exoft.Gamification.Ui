import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AchievementsService} from '../../../app/services/achievements.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MapperService} from '../../../app/services/mapper.service';


@Component({
  selector: 'app-edit-achievement',
  templateUrl: './edit-achievement.component.html',
  styleUrls: ['./edit-achievement.component.scss']
})
export class EditAchievementComponent implements OnInit {

  constructor(private mapperService: MapperService,
              private achievementService: AchievementsService,
              public dialog: MatDialogRef<EditAchievementComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public editAchievementFormGroup: FormGroup;
  public iconUrl: string;

  ngOnInit() {
    this.editAchievementFormGroup = this.mapperService.getAchievement(this.data.achievement);
  }

  public onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = (imageLoading: Event) => {
        this.editAchievementFormGroup.get('icon').setValue(event.target.files[0]);
        this.iconUrl = fileReader.result.toString();
      };
    }
  }

  onSaveChanges() {
    if (this.editAchievementFormGroup.valid) {
      this.achievementService.updateAchievementById(this.editAchievementFormGroup.get('id').value, this.editAchievementFormGroup.value)
        .subscribe(res => {
          this.dialog.close(res);
        });
    }
  }
}
