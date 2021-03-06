export interface UserCreate {
  firstName: string;
  lastName: string;
  userName: string;
  status: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: File;
  roles: string[];
}
