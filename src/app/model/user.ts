export enum Role {
  USER = 'Айтішнік',
  RECRUITER = 'Рекрутер'
}

export enum Gradation {
  JUNIOR,
  MIDDLE,
  SENIOR,
  EXPERT
}

export class User {
  id: number | undefined;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Role;
  gradation?: Gradation;
  token?: string;
  completedTasks?: number;
}
