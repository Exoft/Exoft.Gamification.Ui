export function getFirstLetters(name: string, surname: string) {
  if (!name && !surname) {
    return '';
  }

  const firstNameLetter = !!name ? name.charAt(0) : '';
  const firstSurnameLetter = !!surname ? surname.charAt(0) : '';
  return firstNameLetter + firstSurnameLetter;
}

export function getFirstLettersWithSplit() {
  if (!this.userName) {
    return '';
  }

  const x = this.userName.split(' ');
  return x[0].charAt(0) + x[1].charAt(0);
}
