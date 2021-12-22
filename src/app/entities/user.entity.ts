export enum UserRole {
    'User' = 'User',
    'Admin' = 'Admin'
}
  
export type UserData = {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    deleted: boolean;
    role: UserRole
}