import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {User} from '../models/user';
import {Achievement} from '../models/achievement';
import {AchievementRequest} from "../models/achievement-request";

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor(private formBuilder: FormBuilder) {
  }

  getUser(user: User): FormGroup {
    const form = this.formBuilder.group({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      userName: new FormControl(''),
      status: new FormControl(''),
      xp: new FormControl(''),
      roles: new FormArray([])
    });
    if (user.roles.length != null) {
      user.roles.forEach(role => {
        (form.get('roles').value).push(role);
      });
    }
    form.patchValue(user);
    return form;
  }

  getAchievement(achievement: Achievement): FormGroup {
    const form = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      xp: new FormControl(''),
      icon: new FormControl()
    });

    form.patchValue(achievement);
    return form;
  }

  getAchievementRequest(achievementRequest: AchievementRequest): FormGroup {
    const form = this.formBuilder.group({
      id: new FormControl(''),
      user: this.getUser(achievementRequest.user),
      achievement: this.getAchievement(achievementRequest.achievement),
      message: new FormControl('')
    });
    form.patchValue(achievementRequest);
    return form;
  }
}
