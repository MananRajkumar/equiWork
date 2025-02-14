declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        role: Role;
      }
    }
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

export enum PostStatus {
  Open = "open",
  closed = "closed"
}

export enum ApplicationStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
  UnderReview = "under_review"
}