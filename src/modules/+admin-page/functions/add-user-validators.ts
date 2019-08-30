import {FormControl, FormGroup} from '@angular/forms';

export function passwordEqualityValidator(addUserFormGroup: FormGroup) {
  const password = addUserFormGroup.get('password').value;
  const passwordConfirmation = addUserFormGroup.get('confirmPassword').value;
  if (password !== passwordConfirmation) {
    addUserFormGroup.get('confirmPassword').setErrors({validatePasswordConfirmation: true});
  } else {
    addUserFormGroup.get('confirmPassword').setErrors(null);
    return null;
  }
}

export function passwordContainValidity(passwordFormControl: FormControl) {
  debugger;
  if (!(passwordFormControl.value as string).match(/(^[0-Z]*$)/g)) {
    passwordFormControl.setErrors({inValidContent: true});
  } else {
    return null;
  }
}
