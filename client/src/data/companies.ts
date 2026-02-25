import type { Tier } from "../../../shared/types";

export interface CompanyEntry {
  name: string;
  logo: string;
  tier: Tier;
}

export const TIER1_COMPANIES: CompanyEntry[] = [
  { name: "Google", logo: "https://logo.clearbit.com/google.com", tier: "tier1" },
  { name: "Meta", logo: "https://logo.clearbit.com/meta.com", tier: "tier1" },
  { name: "Apple", logo: "https://logo.clearbit.com/apple.com", tier: "tier1" },
  { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", tier: "tier1" },
  { name: "Netflix", logo: "https://logo.clearbit.com/netflix.com", tier: "tier1" },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", tier: "tier1" },
  { name: "NVIDIA", logo: "https://logo.clearbit.com/nvidia.com", tier: "tier1" },
  { name: "Tesla", logo: "https://logo.clearbit.com/tesla.com", tier: "tier1" },
  { name: "Goldman Sachs", logo: "https://logo.clearbit.com/goldmansachs.com", tier: "tier1" },
  { name: "JPMorgan Chase", logo: "https://logo.clearbit.com/jpmorganchase.com", tier: "tier1" },
  { name: "Jane Street", logo: "https://logo.clearbit.com/janestreet.com", tier: "tier1" },
  { name: "Two Sigma", logo: "https://logo.clearbit.com/twosigma.com", tier: "tier1" },
  { name: "Citadel", logo: "https://logo.clearbit.com/citadel.com", tier: "tier1" },
  { name: "DE Shaw", logo: "https://logo.clearbit.com/deshaw.com", tier: "tier1" },
  { name: "Palantir", logo: "https://logo.clearbit.com/palantir.com", tier: "tier1" },
  { name: "SpaceX", logo: "https://logo.clearbit.com/spacex.com", tier: "tier1" },
  { name: "Databricks", logo: "https://logo.clearbit.com/databricks.com", tier: "tier1" },
  { name: "OpenAI", logo: "https://logo.clearbit.com/openai.com", tier: "tier1" },
  { name: "Anthropic", logo: "https://logo.clearbit.com/anthropic.com", tier: "tier1" },
  { name: "Uber", logo: "https://logo.clearbit.com/uber.com", tier: "tier1" },
  { name: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com", tier: "tier1" },
  { name: "ByteDance", logo: "https://logo.clearbit.com/bytedance.com", tier: "tier1" },
];

export const TIER2_COMPANIES: CompanyEntry[] = [
  { name: "Stripe", logo: "https://logo.clearbit.com/stripe.com", tier: "tier2" },
  { name: "Dropbox", logo: "https://logo.clearbit.com/dropbox.com", tier: "tier2" },
  { name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com", tier: "tier2" },
  { name: "Shopify", logo: "https://logo.clearbit.com/shopify.com", tier: "tier2" },
  { name: "Adobe", logo: "https://logo.clearbit.com/adobe.com", tier: "tier2" },
  { name: "Spotify", logo: "https://logo.clearbit.com/spotify.com", tier: "tier2" },
  { name: "Lyft", logo: "https://logo.clearbit.com/lyft.com", tier: "tier2" },
  { name: "Snap", logo: "https://logo.clearbit.com/snap.com", tier: "tier2" },
  { name: "Pinterest", logo: "https://logo.clearbit.com/pinterest.com", tier: "tier2" },
  { name: "Twitter", logo: "https://logo.clearbit.com/x.com", tier: "tier2" },
  { name: "LinkedIn", logo: "https://logo.clearbit.com/linkedin.com", tier: "tier2" },
  { name: "Reddit", logo: "https://logo.clearbit.com/reddit.com", tier: "tier2" },
  { name: "Discord", logo: "https://logo.clearbit.com/discord.com", tier: "tier2" },
  { name: "Slack", logo: "https://logo.clearbit.com/slack.com", tier: "tier2" },
  { name: "Zoom", logo: "https://logo.clearbit.com/zoom.us", tier: "tier2" },
  { name: "Twilio", logo: "https://logo.clearbit.com/twilio.com", tier: "tier2" },
  { name: "Square", logo: "https://logo.clearbit.com/squareup.com", tier: "tier2" },
  { name: "Robinhood", logo: "https://logo.clearbit.com/robinhood.com", tier: "tier2" },
  { name: "Coinbase", logo: "https://logo.clearbit.com/coinbase.com", tier: "tier2" },
  { name: "Plaid", logo: "https://logo.clearbit.com/plaid.com", tier: "tier2" },
  { name: "Figma", logo: "https://logo.clearbit.com/figma.com", tier: "tier2" },
  { name: "Notion", logo: "https://logo.clearbit.com/notion.so", tier: "tier2" },
  { name: "Atlassian", logo: "https://logo.clearbit.com/atlassian.com", tier: "tier2" },
  { name: "Datadog", logo: "https://logo.clearbit.com/datadoghq.com", tier: "tier2" },
  { name: "Snowflake", logo: "https://logo.clearbit.com/snowflake.com", tier: "tier2" },
  { name: "Cloudflare", logo: "https://logo.clearbit.com/cloudflare.com", tier: "tier2" },
  { name: "MongoDB", logo: "https://logo.clearbit.com/mongodb.com", tier: "tier2" },
  { name: "Elastic", logo: "https://logo.clearbit.com/elastic.co", tier: "tier2" },
  { name: "HashiCorp", logo: "https://logo.clearbit.com/hashicorp.com", tier: "tier2" },
  { name: "Confluent", logo: "https://logo.clearbit.com/confluent.io", tier: "tier2" },
  { name: "Okta", logo: "https://logo.clearbit.com/okta.com", tier: "tier2" },
  { name: "CrowdStrike", logo: "https://logo.clearbit.com/crowdstrike.com", tier: "tier2" },
  { name: "Palo Alto Networks", logo: "https://logo.clearbit.com/paloaltonetworks.com", tier: "tier2" },
  { name: "ServiceNow", logo: "https://logo.clearbit.com/servicenow.com", tier: "tier2" },
  { name: "Workday", logo: "https://logo.clearbit.com/workday.com", tier: "tier2" },
  { name: "Splunk", logo: "https://logo.clearbit.com/splunk.com", tier: "tier2" },
  { name: "DocuSign", logo: "https://logo.clearbit.com/docusign.com", tier: "tier2" },
  { name: "HubSpot", logo: "https://logo.clearbit.com/hubspot.com", tier: "tier2" },
  { name: "Intuit", logo: "https://logo.clearbit.com/intuit.com", tier: "tier2" },
  { name: "PayPal", logo: "https://logo.clearbit.com/paypal.com", tier: "tier2" },
  { name: "Block", logo: "https://logo.clearbit.com/block.xyz", tier: "tier2" },
  { name: "Visa", logo: "https://logo.clearbit.com/visa.com", tier: "tier2" },
  { name: "Mastercard", logo: "https://logo.clearbit.com/mastercard.com", tier: "tier2" },
  { name: "Oracle", logo: "https://logo.clearbit.com/oracle.com", tier: "tier2" },
  { name: "SAP", logo: "https://logo.clearbit.com/sap.com", tier: "tier2" },
  { name: "VMware", logo: "https://logo.clearbit.com/vmware.com", tier: "tier2" },
  { name: "Cisco", logo: "https://logo.clearbit.com/cisco.com", tier: "tier2" },
  { name: "Intel", logo: "https://logo.clearbit.com/intel.com", tier: "tier2" },
  { name: "AMD", logo: "https://logo.clearbit.com/amd.com", tier: "tier2" },
  { name: "Qualcomm", logo: "https://logo.clearbit.com/qualcomm.com", tier: "tier2" },
  { name: "IBM", logo: "https://logo.clearbit.com/ibm.com", tier: "tier2" },
  { name: "Dell", logo: "https://logo.clearbit.com/dell.com", tier: "tier2" },
  { name: "Roblox", logo: "https://logo.clearbit.com/roblox.com", tier: "tier2" },
  { name: "Epic Games", logo: "https://logo.clearbit.com/epicgames.com", tier: "tier2" },
  { name: "Unity", logo: "https://logo.clearbit.com/unity.com", tier: "tier2" },
  { name: "DoorDash", logo: "https://logo.clearbit.com/doordash.com", tier: "tier2" },
  { name: "Instacart", logo: "https://logo.clearbit.com/instacart.com", tier: "tier2" },
  { name: "Grammarly", logo: "https://logo.clearbit.com/grammarly.com", tier: "tier2" },
  { name: "Canva", logo: "https://logo.clearbit.com/canva.com", tier: "tier2" },
  { name: "Asana", logo: "https://logo.clearbit.com/asana.com", tier: "tier2" },
];

export const ALL_COMPANIES = [...TIER1_COMPANIES, ...TIER2_COMPANIES];

export function findCompany(name: string): CompanyEntry | undefined {
  return ALL_COMPANIES.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}
