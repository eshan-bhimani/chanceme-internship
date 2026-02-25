import React, { useState } from "react";
import type { CalculateChanceResponse, Tier } from "../types";

interface PreviousInternship {
  company: string;
  position: string;
  duration: string;
  tier: Tier;
}

interface AcademicInfo {
  university: string;
  gpa: string;
  major: string;
}

interface TargetInternship {
  company: string;
  position: string;
  tier: Tier;
}

const TIER_OPTIONS: { value: Tier; label: string }[] = [
  { value: "tier1", label: "Tier 1 (Top-tier / FAANG-level)" },
  { value: "tier2", label: "Tier 2 (Mid-size / well-known)" },
  { value: "tier3", label: "Tier 3 (Startup / local)" },
];

const emptyPreviousInternship = (): PreviousInternship => ({
  company: "",
  position: "",
  duration: "",
  tier: "tier3",
});

export default function InternshipInputForm(): React.ReactElement {
  const [previousInternships, setPreviousInternships] = useState<PreviousInternship[]>([]);
  const [academic, setAcademic] = useState<AcademicInfo>({
    university: "",
    gpa: "",
    major: "",
  });
  const [target, setTarget] = useState<TargetInternship>({
    company: "",
    position: "",
    tier: "tier1",
  });
  const [result, setResult] = useState<CalculateChanceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ── Previous internship helpers ──────────────────────────────────────────

  function addInternship() {
    setPreviousInternships((prev) => [...prev, emptyPreviousInternship()]);
  }

  function removeInternship(index: number) {
    setPreviousInternships((prev) => prev.filter((_, i) => i !== index));
  }

  function updateInternship<K extends keyof PreviousInternship>(
    index: number,
    field: K,
    value: PreviousInternship[K]
  ) {
    setPreviousInternships((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  // ── Submit ───────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const gpaNum = parseFloat(academic.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
      setError("GPA must be a number between 0.0 and 4.0.");
      return;
    }

    const payload = {
      previousInternships: previousInternships.map(({ company, position, tier }) => ({
        company,
        field: position,
        tier,
      })),
      gpa: gpaNum,
      targetInternship: {
        company: target.company,
        field: target.position,
        tier: target.tier,
      },
    };

    setLoading(true);
    try {
      const response = await fetch("/api/calculate-chance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: CalculateChanceResponse | { error: string } = await response.json();

      if (!response.ok) {
        setError((data as { error: string }).error ?? "An unexpected error occurred.");
      } else {
        setResult(data as CalculateChanceResponse);
      }
    } catch {
      setError("Failed to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Internship Chance Calculator</h1>

      <form onSubmit={handleSubmit} style={styles.form} noValidate>

        {/* ── Academic Information ────────────────────────────────────────── */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Academic Information</h2>

          <label style={styles.label}>
            University
            <input
              style={styles.input}
              type="text"
              value={academic.university}
              onChange={(e) => setAcademic({ ...academic, university: e.target.value })}
              placeholder="e.g. MIT"
            />
          </label>

          <label style={styles.label}>
            GPA <span style={styles.required}>*</span>
            <input
              style={styles.input}
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={academic.gpa}
              onChange={(e) => setAcademic({ ...academic, gpa: e.target.value })}
              placeholder="0.00 – 4.00"
              required
            />
          </label>

          <label style={styles.label}>
            Major
            <input
              style={styles.input}
              type="text"
              value={academic.major}
              onChange={(e) => setAcademic({ ...academic, major: e.target.value })}
              placeholder="e.g. Computer Science"
            />
          </label>
        </section>

        {/* ── Target Internship ───────────────────────────────────────────── */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Target Internship</h2>

          <label style={styles.label}>
            Company <span style={styles.required}>*</span>
            <input
              style={styles.input}
              type="text"
              value={target.company}
              onChange={(e) => setTarget({ ...target, company: e.target.value })}
              placeholder="e.g. Google"
              required
            />
          </label>

          <label style={styles.label}>
            Position / Field <span style={styles.required}>*</span>
            <input
              style={styles.input}
              type="text"
              value={target.position}
              onChange={(e) => setTarget({ ...target, position: e.target.value })}
              placeholder="e.g. Software Engineering"
              required
            />
          </label>

          <label style={styles.label}>
            Company Tier <span style={styles.required}>*</span>
            <select
              style={styles.select}
              value={target.tier}
              onChange={(e) => setTarget({ ...target, tier: e.target.value as Tier })}
              required
            >
              {TIER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </section>

        {/* ── Previous Internships ────────────────────────────────────────── */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Previous Internships</h2>
            <button type="button" onClick={addInternship} style={styles.addButton}>
              + Add
            </button>
          </div>

          {previousInternships.length === 0 && (
            <p style={styles.emptyNote}>No previous internships added. Click "+ Add" to include one.</p>
          )}

          {previousInternships.map((internship, index) => (
            <div key={index} style={styles.internshipCard}>
              <div style={styles.cardHeader}>
                <span style={styles.cardTitle}>Internship #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeInternship(index)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>

              <label style={styles.label}>
                Company <span style={styles.required}>*</span>
                <input
                  style={styles.input}
                  type="text"
                  value={internship.company}
                  onChange={(e) => updateInternship(index, "company", e.target.value)}
                  placeholder="e.g. Meta"
                  required
                />
              </label>

              <label style={styles.label}>
                Position / Field <span style={styles.required}>*</span>
                <input
                  style={styles.input}
                  type="text"
                  value={internship.position}
                  onChange={(e) => updateInternship(index, "position", e.target.value)}
                  placeholder="e.g. Software Engineering"
                  required
                />
              </label>

              <label style={styles.label}>
                Duration
                <input
                  style={styles.input}
                  type="text"
                  value={internship.duration}
                  onChange={(e) => updateInternship(index, "duration", e.target.value)}
                  placeholder="e.g. 3 months"
                />
              </label>

              <label style={styles.label}>
                Company Tier <span style={styles.required}>*</span>
                <select
                  style={styles.select}
                  value={internship.tier}
                  onChange={(e) => updateInternship(index, "tier", e.target.value as Tier)}
                  required
                >
                  {TIER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ))}
        </section>

        {/* ── Submit ──────────────────────────────────────────────────────── */}
        {error && <p style={styles.errorMessage}>{error}</p>}

        <button type="submit" style={styles.submitButton} disabled={loading}>
          {loading ? "Calculating…" : "Calculate My Chance"}
        </button>
      </form>

      {/* ── Result ────────────────────────────────────────────────────────── */}
      {result && (
        <div style={styles.resultCard}>
          <h2 style={styles.resultTitle}>Your Estimated Chance</h2>
          <p style={styles.chanceDisplay}>{result.chance}%</p>
          <table style={styles.breakdownTable}>
            <tbody>
              <tr>
                <td style={styles.breakdownLabel}>Base score</td>
                <td style={styles.breakdownValue}>{result.breakdown.base} pts</td>
              </tr>
              <tr>
                <td style={styles.breakdownLabel}>GPA bonus</td>
                <td style={styles.breakdownValue}>{result.breakdown.gpaBonus} pts</td>
              </tr>
              <tr>
                <td style={styles.breakdownLabel}>Internship bonus</td>
                <td style={styles.breakdownValue}>{result.breakdown.internshipBonus} pts</td>
              </tr>
              <tr>
                <td style={styles.breakdownLabel}>Total</td>
                <td style={styles.breakdownValue}>{result.breakdown.total} pts</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Inline styles ────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 640,
    margin: "0 auto",
    padding: "2rem 1rem",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#1a1a1a",
  },
  heading: {
    fontSize: "1.75rem",
    fontWeight: 700,
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  section: {
    background: "#f9f9f9",
    border: "1px solid #e0e0e0",
    borderRadius: 8,
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.25rem",
  },
  sectionTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    margin: 0,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    fontSize: "0.9rem",
    fontWeight: 500,
  },
  required: {
    color: "#d32f2f",
  },
  input: {
    padding: "0.5rem 0.75rem",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: "0.95rem",
    outline: "none",
  },
  select: {
    padding: "0.5rem 0.75rem",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: "0.95rem",
    background: "#fff",
    outline: "none",
  },
  addButton: {
    padding: "0.35rem 0.85rem",
    borderRadius: 6,
    border: "1px solid #1976d2",
    background: "#fff",
    color: "#1976d2",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "0.875rem",
  },
  internshipCard: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 6,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.65rem",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: "0.875rem",
    color: "#555",
  },
  removeButton: {
    padding: "0.25rem 0.6rem",
    borderRadius: 4,
    border: "1px solid #d32f2f",
    background: "#fff",
    color: "#d32f2f",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  emptyNote: {
    color: "#888",
    fontSize: "0.875rem",
    margin: 0,
  },
  submitButton: {
    padding: "0.75rem",
    borderRadius: 8,
    border: "none",
    background: "#1976d2",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  errorMessage: {
    color: "#d32f2f",
    background: "#fff5f5",
    border: "1px solid #f5c6c6",
    borderRadius: 6,
    padding: "0.65rem 1rem",
    fontSize: "0.9rem",
    margin: 0,
  },
  resultCard: {
    marginTop: "2rem",
    background: "#e8f5e9",
    border: "1px solid #a5d6a7",
    borderRadius: 8,
    padding: "1.5rem",
    textAlign: "center",
  },
  resultTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    margin: "0 0 0.5rem",
  },
  chanceDisplay: {
    fontSize: "3rem",
    fontWeight: 700,
    color: "#2e7d32",
    margin: "0.5rem 0 1rem",
  },
  breakdownTable: {
    margin: "0 auto",
    borderCollapse: "collapse",
    fontSize: "0.875rem",
    textAlign: "left",
  },
  breakdownLabel: {
    padding: "0.2rem 1rem 0.2rem 0",
    color: "#555",
  },
  breakdownValue: {
    padding: "0.2rem 0",
    fontWeight: 600,
    color: "#1a1a1a",
  },
};
