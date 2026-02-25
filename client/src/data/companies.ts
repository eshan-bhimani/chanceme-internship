import type { Tier } from "../../../shared/types";

export interface CompanyEntry {
  name: string;
  logo: string;
  tier: Tier;
}

export const TIER1_COMPANIES: CompanyEntry[] = [
  {
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    tier: "tier1",
  },
  {
    name: "Meta",
    logo: "https://logo.clearbit.com/meta.com",
    tier: "tier1",
  },
  {
    name: "Apple",
    logo: "https://logo.clearbit.com/apple.com",
    tier: "tier1",
  },
  {
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    tier: "tier1",
  },
  {
    name: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
    tier: "tier1",
  },
  {
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    tier: "tier1",
  },
];

export const TIER2_COMPANIES: CompanyEntry[] = [
  {
    name: "Stripe",
    logo: "https://logo.clearbit.com/stripe.com",
    tier: "tier2",
  },
  {
    name: "Dropbox",
    logo: "https://logo.clearbit.com/dropbox.com",
    tier: "tier2",
  },
  {
    name: "Salesforce",
    logo: "https://logo.clearbit.com/salesforce.com",
    tier: "tier2",
  },
  {
    name: "Shopify",
    logo: "https://logo.clearbit.com/shopify.com",
    tier: "tier2",
  },
  {
    name: "Adobe",
    logo: "https://logo.clearbit.com/adobe.com",
    tier: "tier2",
  },
];

export const ALL_COMPANIES = [...TIER1_COMPANIES, ...TIER2_COMPANIES];

export function findCompany(name: string): CompanyEntry | undefined {
  return ALL_COMPANIES.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}
