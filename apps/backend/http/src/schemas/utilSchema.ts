export interface AuthRequest extends Request {
  user: {
    id: string;
    role: Role
  }
}

export enum Role {
    Admin = "admin",
    Company = "company",
    User = "user",
}

export enum JobStatus {
  Incomplete = "incomplete",
  Complete = "complete"
}