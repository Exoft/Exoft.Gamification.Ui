export function  getFirstLetters(name: string, surname: string) {
  const firstNameLetter = name.charAt(0);
  const firstSurnameLetter = surname.charAt(0);
  return firstNameLetter + firstSurnameLetter;
}

export function getFirstLettersWithSplit() {
  const x = this.userName.split(' ');
  return x[0].charAt(0) + x[1].charAt(0);
}