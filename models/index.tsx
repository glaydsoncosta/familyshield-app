export interface IGuardian {
  id: number;
  name: string;
  email: string;
  phone: string;
  role:
    | "Mom"
    | "Dad"
    | "Guardian"
    | "Grandfather"
    | "Grandmother"
    | "Stepmom"
    | "Stepdad"
    | undefined
    | null;
  familyGoals: string;
  familyValues: string;
  admin: boolean;
}

export interface IChild {
  id: number;
  name: string;
  age: number | null;
  relationship:
    | "Child"
    | "Step-Child"
    | "Grandchild"
    | "Other"
    | undefined
    | null;
  gender: "Boy" | "Girl" | "Non-Binary" | "Other" | undefined | null;
  guardians: IGuardian[];
  guardianRelationshipQuality: "Good" | "Average" | "Poor" | null;
}
