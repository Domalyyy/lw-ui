export enum Role {
  USER,
  RECRUITER
}

export enum Gradation {
  JUNIOR,
  MIDDLE,
  SENIOR,
  EXPERT
}

export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  active?: boolean;
  role?: Role;
  gradation?: Gradation;
  token?: string;
}
