export interface UpdateUser {
    firstName: string;
    lastName: string;
    userName: string;
    status: string;
    email: string;
    roles: string[];
    avatar: File;
}