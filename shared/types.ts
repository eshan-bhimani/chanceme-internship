export type Tier = "tier1" | "tier2" | "tier3";

export interface Internship {
  company: string;
  tier: Tier;
  field: string;
}

export interface CalculateChanceRequest {
  previousInternships: Internship[];
  gpa: number;
  targetInternship: Internship;
}

export interface CalculateChanceResponse {
  chance: number;
  breakdown: {
    base: number;
    gpaBonus: number;
    internshipBonus: number;
    tierPenalty: number;
    total: number;
  };
}
