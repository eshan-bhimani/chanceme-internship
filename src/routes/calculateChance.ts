import { Router, Request, Response } from "express";
import {
  CalculateChanceRequest,
  CalculateChanceResponse,
  Internship,
  Tier,
} from "../types";

const router = Router();

// Numeric tier levels — higher means more prestigious
const TIER_LEVEL: Record<Tier, number> = {
  tier1: 3,
  tier2: 2,
  tier3: 1,
};

const VALID_TIERS = new Set<string>(["tier1", "tier2", "tier3"]);
const MAX_GPA = 4.0;
const BASE_CHANCE = 10;

/**
 * Rule-based chance calculator.
 *
 * Scoring:
 *  - Base:             10 pts
 *  - GPA bonus:        up to 20 pts  (scales linearly with GPA / 4.0)
 *  - Per previous internship:
 *      tier + field match:  25 pts
 *      tier match only:     15 pts
 *      field match only:    10 pts
 *      no match:             3 pts  (any internship experience still counts)
 *  - Result capped at 95 (never 100 — nothing is guaranteed)
 */
function computeChance(body: CalculateChanceRequest): CalculateChanceResponse {
  const { previousInternships, gpa, targetInternship } = body;

  const gpaBonus = (Math.min(gpa, MAX_GPA) / MAX_GPA) * 20;

  const targetTierLevel = TIER_LEVEL[targetInternship.tier];
  const targetField = targetInternship.field.toLowerCase().trim();

  let internshipBonus = 0;

  for (const prev of previousInternships) {
    const prevTierLevel = TIER_LEVEL[prev.tier];
    const prevField = prev.field.toLowerCase().trim();

    // A previous internship at an equal-or-higher tier is a strong signal
    const tierMatch = prevTierLevel >= targetTierLevel;
    const fieldMatch = prevField === targetField;

    if (tierMatch && fieldMatch) {
      internshipBonus += 25;
    } else if (tierMatch) {
      internshipBonus += 15;
    } else if (fieldMatch) {
      internshipBonus += 10;
    } else {
      internshipBonus += 3;
    }
  }

  const total = Math.min(
    Math.round(BASE_CHANCE + gpaBonus + internshipBonus),
    95
  );

  return {
    chance: total,
    breakdown: {
      base: BASE_CHANCE,
      gpaBonus: Math.round(gpaBonus * 10) / 10,
      internshipBonus,
      total,
    },
  };
}

function isValidInternship(obj: unknown): obj is Internship {
  if (typeof obj !== "object" || obj === null) return false;
  const { company, tier, field } = obj as Record<string, unknown>;
  return (
    typeof company === "string" &&
    company.trim().length > 0 &&
    typeof tier === "string" &&
    VALID_TIERS.has(tier) &&
    typeof field === "string" &&
    field.trim().length > 0
  );
}

function validateBody(
  body: unknown
): { valid: true; data: CalculateChanceRequest } | { valid: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Request body must be a JSON object" };
  }

  const { previousInternships, gpa, targetInternship } = body as Record<
    string,
    unknown
  >;

  if (!Array.isArray(previousInternships)) {
    return { valid: false, error: '"previousInternships" must be an array' };
  }

  for (let i = 0; i < previousInternships.length; i++) {
    if (!isValidInternship(previousInternships[i])) {
      return {
        valid: false,
        error: `"previousInternships[${i}]" must have company (string), tier (tier1|tier2|tier3), and field (string)`,
      };
    }
  }

  if (typeof gpa !== "number" || gpa < 0 || gpa > 4.0) {
    return { valid: false, error: '"gpa" must be a number between 0 and 4.0' };
  }

  if (!isValidInternship(targetInternship)) {
    return {
      valid: false,
      error: '"targetInternship" must have company (string), tier (tier1|tier2|tier3), and field (string)',
    };
  }

  return {
    valid: true,
    data: {
      previousInternships: previousInternships as Internship[],
      gpa,
      targetInternship: targetInternship as Internship,
    },
  };
}

router.post("/", (req: Request, res: Response) => {
  const validation = validateBody(req.body);

  if (!validation.valid) {
    res.status(400).json({ error: validation.error });
    return;
  }

  const result: CalculateChanceResponse = computeChance(validation.data);
  res.status(200).json(result);
});

export default router;
