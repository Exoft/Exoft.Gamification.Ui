import {Component, Inject, OnInit} from '@angular/core';
import {AchievementsService} from '../../../app/services/achievements.service';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Achievement} from 'src/modules/app/models/achievement/achievement';
import {FormBuilder, FormGroup, FormArray} from 'ngx-strongly-typed-forms';
import {forkJoin, Observable} from 'rxjs';
import {ReturningPagingInfo} from 'src/modules/app/models/user/return-page-info';
import {UserAchievement} from '../../../app/models/achievement/user-achievement';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {finalize} from 'rxjs/operators';
import {AlertService} from '../../../app/services/alert.service';

export class Achievements {
  achievements: UserSelectedAchievement[];
}

export class UserSelectedAchievement {
  isSelected: boolean;
  count: number;
  achievement: Achievement;
}

export enum ScrollDirection {
  forward,
  backward
}

@Component({
  selector: 'app-assign-achievements',
  templateUrl: './assign-achievements.component.html',
  styleUrls: ['./assign-achievements.component.scss']
})
export class AssignAchievementsComponent implements OnInit {
  private userAchievements: UserAchievement[] = [];

  allAchievements: Achievement[] = [];
  form: FormGroup<Achievements>;

  scrollDirection = ScrollDirection;

  get achievementsFormArray() {
    return this.form.controls.achievements as FormArray<UserSelectedAchievement>;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly achievementsService: AchievementsService,
    private readonly dialog: MatDialogRef<AssignAchievementsComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    private readonly loadSpinnerService: LoadSpinnerService,
    private readonly alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.setForm();
    this.loadData();
  }

  private setForm() {
    this.form = this.fb.group<Achievements>({
      achievements: this.fb.array<UserSelectedAchievement>(
        this.allAchievements.map(achievement =>
          this.getUserAchievementFormGroup(achievement)
        )
      )
    });
  }

  private getUserAchievementFormGroup(achievement: Achievement) {
    const isSelectedAchievement = this.userAchievements.find(
      userAchievement => userAchievement.achievementId === achievement.id
    );

    return this.fb.group<UserSelectedAchievement>({
      isSelected: !!isSelectedAchievement,
      // TODO: set achievements count from backend, when data will be send
      count: !!isSelectedAchievement ? 1 : 0,
      achievement
    });
  }

  private loadData() {
    const requests: Observable<ReturningPagingInfo<Achievement | UserAchievement>>[] = [
      this.achievementsService.getAllAchievements(),
      this.achievementsService.getAchievementsByUserId(this.data)
    ];

    this.loadSpinnerService.showSpinner();
    forkJoin(requests)
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()))
      .subscribe(
        res => {
          this.allAchievements = res[0].data as Achievement[];
          this.userAchievements = res[1].data as UserAchievement[];
          this.setFormData();
        },
        error => {
          this.alertService.error();
        }
      );
  }

  private setFormData() {
    const formArray = this.achievementsFormArray;

    this.allAchievements.forEach(achievement => {
      formArray.insert(
        formArray.length,
        this.getUserAchievementFormGroup(achievement)
      );
    });
  }

  private getAchievementFormGroupById(achievementId: string) {
    return this.achievementsFormArray.controls.find(
      control => control.value.achievement.id === achievementId
    ) as FormGroup<UserSelectedAchievement>;
  }

  getAchievementCount(achievement: Achievement) {
    const achievementControl = this.getAchievementFormGroupById(achievement.id);
    return achievementControl.value.count;
  }

  changeAchivementCount(direction: ScrollDirection, achievement: Achievement) {
    if (
      !this.isScrollDownEnabled(achievement) &&
      direction === ScrollDirection.backward
    ) {
      return;
    }

    const achievementControl = this.getAchievementFormGroupById(achievement.id);

    const achievementCount = achievementControl.value.count;

    direction === this.scrollDirection.forward
      ? achievementControl.controls.count.setValue(achievementCount + 1)
      : achievementControl.controls.count.setValue(achievementCount - 1);
  }

  isScrollDownEnabled(achievement: Achievement) {
    const formArray = this.achievementsFormArray;
    const currentCount = formArray.controls.find(
      control => control.value.achievement.id === achievement.id
    ).value.count;

    return currentCount > 1;
  }

  isAchievementSelected(achievement: Achievement) {
    const achievementControl = this.getAchievementFormGroupById(achievement.id);
    return achievementControl.value.isSelected;
  }

  onAchievementSelect(achievement: Achievement, event: MatCheckboxChange) {
    if (event.checked) {
      const achievementControl = this.getAchievementFormGroupById(
        achievement.id
      );

      if (achievementControl.value.count === 0) {
        (achievementControl as FormGroup<UserSelectedAchievement>).controls.count.setValue(1);
      }
    }
  }

  saveUserAchievements() {
    const formArray = this.achievementsFormArray;
    const achievementControls = formArray.controls.filter(
      control => control.value.isSelected
    );

    // TODO: implement sending achievements count, when endpoint will be done
    const userId = this.data;
    const selectedAchievementsIds = achievementControls.map(
      control => control.value.achievement.id
    );

    this.loadSpinnerService.showSpinner();
    this.achievementsService
      .addOrUpdateUserAchievements(userId, selectedAchievementsIds)
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()))
      .subscribe(
        res => {
          this.dialog.close();
          this.alertService.success('Data was successfully saved!');
        },
        error => {
          this.alertService.error();
        }
      );
  }
}
