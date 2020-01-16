import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AchievementsService} from '../../../app/services/achievements.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-add-achievement',
  templateUrl: './add-achievement.component.html',
  styleUrls: ['./add-achievement.component.scss']
})
export class AddAchievementComponent implements OnInit {
  public addAchievementFormGroup: FormGroup;
  public iconUrl: string;

  constructor(private formBuilder: FormBuilder,
              private achievementService: AchievementsService,
              public dialog: MatDialogRef<AddAchievementComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.addAchievementFormGroup = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      xp: new FormControl('', Validators.required),
      icon: new FormControl('')
    });
  }

  public onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = (imageLoading: Event) => {
        this.addAchievementFormGroup.get('icon').setValue(event.target.files[0]);
        this.iconUrl = fileReader.result.toString();
      };
    }
  }

  onSaveChanges() {
    if (this.addAchievementFormGroup.valid) {
      this.achievementService.addNewAchievement(this.addAchievementFormGroup.value).subscribe(res => {
        this.dialog.close(res);
      });
    }
  }
}
