import {Injectable} from '@angular/core';
import {NewPassword} from '../models/password/new-password';
import {ValidatorFn, AbstractControl} from 'ngx-strongly-typed-forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  passwordsAreEqualValidator(): ValidatorFn<NewPassword> {
    return (form: AbstractControl<NewPassword>) => {
      const {password, confirmPassword} = form.value;

      if (!password || !confirmPassword) {
        return null;
      }

      if (password !== confirmPassword) {
        return {passwordsAreNotEqual: true};
      }

      return null;
    };
  }
}
