import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {User} from '../models/user/user';
import {Achievement} from '../models/achievement/achievement';


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
      iconId: new FormControl()
    });

    form.patchValue(achievement);
    return form;
  }
}
