import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor(private formBuilder: FormBuilder) {
  }

  getUser(user: User): FormGroup {
    const form = this.formBuilder.group({
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
}
