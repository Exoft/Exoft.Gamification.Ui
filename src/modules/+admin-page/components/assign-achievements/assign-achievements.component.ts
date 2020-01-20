import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AchievementsService} from '../../../app/services/achievements.service';
import {MapperService} from '../../../app/services/mapper.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-assign-achievements',
  templateUrl: './assign-achievements.component.html',
  styleUrls: ['./assign-achievements.component.scss']
})
export class AssignAchievementsComponent implements OnInit {

  availableAchievementsFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private achievementsService: AchievementsService,
              private mapper: MapperService,
              public dialog: MatDialogRef<AssignAchievementsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.availableAchievementsFormGroup = this.formBuilder.group({
      availableAchievements: new FormArray([])
    });
    this.achievementsService.getAllAchievements().subscribe(achievements => {
      achievements.forEach(achievement => {
        this.achievements.push(this.formBuilder.group({
          id: new FormControl(achievement.id),
          isChosen: new FormControl(false),
          name: new FormControl(achievement.name),
          count: new FormControl(''),
          description: new FormControl(''),
          xp: new FormControl(''),
          icon: new FormControl('')
        }));
      });
      this.achievementsService.getAchievementsByUserId(this.data.userId).subscribe(userAchievements => {
        userAchievements.data.forEach(achievement => {
          const userAch = this.achievements.controls.find(x => x.value.name === achievement.name).value;
          userAch.isChosen = true;
          userAch.count = userAch.count + 1;
          this.achievements.controls.find(x => x.value.name === achievement.name).patchValue(userAch);
        });
      });
    });
  }

  get achievements(): FormArray {
    return this.availableAchievementsFormGroup.get('availableAchievements') as FormArray;
  }

  onSaveChanges() {
    this.achievementsService.addOrUpdateUserAchievements(this.data.userId, this.achievements.value
      .filter(x => x.isChosen)
      .map(({id}) => id))
      .subscribe(res => {
        this.dialog.close(res);
      });
  }
}
