import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import type { CalculateChanceResponse, Tier } from "../../../shared/types";
import {
  TIER1_COMPANIES,
  TIER2_COMPANIES,
  findCompany,
  type CompanyEntry,
} from "../data/companies";
import {
  TOP_UNIVERSITIES,
  findUniversity,
  type UniversityEntry,
} from "../data/universities";
import styles from "./InternshipInputForm.module.css";

/* ─── Local interfaces ─── */

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

/* ─── Portal-based dropdown hook ─── */

function useDropdownPortal(
  open: boolean,
  inputRef: React.RefObject<HTMLInputElement | null>
) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (!open || !inputRef.current) return;

    function updatePosition() {
      if (!inputRef.current) return;
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 6 + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, inputRef]);

  return position;
}

/* ─── Company selector sub-component ─── */

interface CompanySelectorProps {
  value: string;
  tier: Tier;
  onCompanyChange: (company: string, tier: Tier) => void;
  placeholder?: string;
}

function CompanySelector({
  value,
  tier,
  onCompanyChange,
  placeholder = "Search or select a company…",
}: CompanySelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const portalPos = useDropdownPortal(open, inputRef);

  // Sync external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Scroll dropdown to top when query changes
  useEffect(() => {
    if (dropdownRef.current) {
      dropdownRef.current.scrollTop = 0;
    }
  }, [query]);

  const filterCompanies = useCallback(
    (list: CompanyEntry[]) => {
      if (!query) return list;
      const q = query.toLowerCase();
      return list.filter((c) => c.name.toLowerCase().includes(q));
    },
    [query]
  );

  const filteredTier1 = filterCompanies(TIER1_COMPANIES);
  const filteredTier2 = filterCompanies(TIER2_COMPANIES);
  const totalResults = filteredTier1.length + filteredTier2.length;
  const hasResults = totalResults > 0;

  function selectCompany(entry: CompanyEntry) {
    setQuery(entry.name);
    onCompanyChange(entry.name, entry.tier);
    setOpen(false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    setOpen(true);

    const match = findCompany(val);
    if (match) {
      onCompanyChange(match.name, match.tier);
    } else {
      onCompanyChange(val, "tier3");
    }
  }

  function handleFocus() {
    setOpen(true);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  const matched = findCompany(value);

  const dropdownContent = open ? (
    <div
      className={styles.portalDropdown}
      ref={dropdownRef}
      style={{
        top: portalPos.top,
        left: portalPos.left,
        width: portalPos.width,
      }}
    >
      {filteredTier1.length > 0 && (
        <>
          <div className={styles.dropdownGroupLabel}>
            Tier 1 — FAANG & Top-tier ({filteredTier1.length})
          </div>
          {filteredTier1.map((c) => (
            <div
              key={c.name}
              className={styles.dropdownItem}
              onMouseDown={() => selectCompany(c)}
            >
              <img
                src={c.logo}
                alt=""
                className={styles.dropdownItemLogo}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className={styles.dropdownItemName}>{c.name}</span>
              <span
                className={`${styles.dropdownTierBadge} ${styles.tierBadge1}`}
              >
                T1
              </span>
            </div>
          ))}
        </>
      )}
      {filteredTier2.length > 0 && (
        <>
          <div className={styles.dropdownGroupLabel}>
            Tier 2 — Well-known ({filteredTier2.length})
          </div>
          {filteredTier2.map((c) => (
            <div
              key={c.name}
              className={styles.dropdownItem}
              onMouseDown={() => selectCompany(c)}
            >
              <img
                src={c.logo}
                alt=""
                className={styles.dropdownItemLogo}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className={styles.dropdownItemName}>{c.name}</span>
              <span
                className={`${styles.dropdownTierBadge} ${styles.tierBadge2}`}
              >
                T2
              </span>
            </div>
          ))}
        </>
      )}
      {!hasResults && query && (
        <div className={styles.dropdownCustomHint}>
          Press Enter or continue typing — custom company (Tier 3)
        </div>
      )}
      {!query && (
        <div className={styles.dropdownCustomHint}>
          Type to search or enter a custom company name
        </div>
      )}
      {hasResults && totalResults > 8 && (
        <div className={styles.dropdownScrollHint}>
          <span className={styles.dropdownScrollHintArrow}>↓</span>
          Scroll to see more companies
        </div>
      )}
    </div>
  ) : null;

  return (
    <div className={styles.companyFieldWrapper} ref={wrapperRef}>
      <div className={styles.companyInputRow}>
        {matched && (
          <img
            key={matched.name}
            src={matched.logo}
            alt={`${matched.name} logo`}
            className={styles.companyLogo}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}
        <div className={styles.companyInputWrapper}>
          <input
            ref={inputRef}
            className={styles.companyInput}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
          />
        </div>
      </div>
      {/* Hidden display showing resolved tier */}
      {value && (
        <div
          style={{
            marginTop: "0.3rem",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          {tier === "tier1"
            ? "Tier 1 — FAANG-level"
            : tier === "tier2"
              ? "Tier 2 — Well-known"
              : "Tier 3 — Other"}
        </div>
      )}
      {createPortal(dropdownContent, document.body)}
    </div>
  );
}

/* ─── University selector sub-component ─── */

interface UniversitySelectorProps {
  value: string;
  onUniversityChange: (university: string) => void;
  placeholder?: string;
}

function UniversitySelector({
  value,
  onUniversityChange,
  placeholder = "Search or select a university…",
}: UniversitySelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const portalPos = useDropdownPortal(open, inputRef);

  // Sync external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Scroll dropdown to top when query changes
  useEffect(() => {
    if (dropdownRef.current) {
      dropdownRef.current.scrollTop = 0;
    }
  }, [query]);

  const filtered = useMemo(() => {
    if (!query) return TOP_UNIVERSITIES;
    const q = query.toLowerCase();
    return TOP_UNIVERSITIES.filter((u) => u.name.toLowerCase().includes(q));
  }, [query]);

  function selectUniversity(entry: UniversityEntry) {
    setQuery(entry.name);
    onUniversityChange(entry.name);
    setOpen(false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    setOpen(true);
    onUniversityChange(val);
  }

  function handleFocus() {
    setOpen(true);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  const matched = findUniversity(value);

  const dropdownContent = open ? (
    <div
      className={styles.portalDropdown}
      ref={dropdownRef}
      style={{
        top: portalPos.top,
        left: portalPos.left,
        width: portalPos.width,
      }}
    >
      {filtered.length > 0 ? (
        <>
          <div className={styles.dropdownGroupLabel}>
            Top Universities ({filtered.length})
          </div>
          {filtered.map((u) => (
            <div
              key={u.name}
              className={styles.dropdownItem}
              onMouseDown={() => selectUniversity(u)}
            >
              <img
                src={u.logo}
                alt=""
                className={styles.dropdownItemLogo}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className={styles.dropdownItemName}>{u.name}</span>
              <span
                className={`${styles.dropdownTierBadge} ${styles.tierBadgeUni}`}
              >
                Top
              </span>
            </div>
          ))}
        </>
      ) : query ? (
        <div className={styles.dropdownCustomHint}>
          No matching university — using custom entry
        </div>
      ) : null}
      {!query && (
        <div className={styles.dropdownCustomHint}>
          Type to search or enter a custom university name
        </div>
      )}
      {filtered.length > 8 && (
        <div className={styles.dropdownScrollHint}>
          <span className={styles.dropdownScrollHintArrow}>↓</span>
          Scroll to see more universities
        </div>
      )}
    </div>
  ) : null;

  return (
    <div className={styles.companyFieldWrapper} ref={wrapperRef}>
      <div className={styles.companyInputRow}>
        {matched && (
          <img
            key={matched.name}
            src={matched.logo}
            alt={`${matched.name} logo`}
            className={styles.companyLogo}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}
        <div className={styles.companyInputWrapper}>
          <input
            ref={inputRef}
            className={styles.companyInput}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
          />
        </div>
      </div>
      {createPortal(dropdownContent, document.body)}
    </div>
  );
}

/* ─── Helpers ─── */

const emptyPreviousInternship = (): PreviousInternship => ({
  company: "",
  position: "",
  duration: "",
  tier: "tier3",
});

/* ─── Main form component ─── */

export default function InternshipInputForm(): React.ReactElement {
  const [previousInternships, setPreviousInternships] = useState<
    PreviousInternship[]
  >([]);
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

  /* Internship list helpers */

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
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  }

  /* Submit */

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
      previousInternships: previousInternships.map(
        ({ company, position, tier }) => ({
          company,
          field: position,
          tier,
        })
      ),
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

      const data: CalculateChanceResponse | { error: string } =
        await response.json();

      if (!response.ok) {
        setError(
          (data as { error: string }).error ?? "An unexpected error occurred."
        );
      } else {
        setResult(data as CalculateChanceResponse);
      }
    } catch {
      setError("Failed to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ─── Render ─── */

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Internship Chance Calculator</h1>
      <p className={styles.subtitle}>
        Estimate your odds at landing your dream internship.
      </p>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* ── Academic Information ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Academic Information</h2>

          <div className={styles.label}>
            University
            <UniversitySelector
              value={academic.university}
              onUniversityChange={(university) =>
                setAcademic({ ...academic, university })
              }
              placeholder="Search MIT, Stanford, Oxford…"
            />
          </div>

          <label className={styles.label}>
            GPA <span className={styles.required}>*</span>
            <input
              className={styles.input}
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={academic.gpa}
              onChange={(e) =>
                setAcademic({ ...academic, gpa: e.target.value })
              }
              placeholder="0.00 – 4.00"
              required
            />
          </label>

          <label className={styles.label}>
            Major
            <input
              className={styles.input}
              type="text"
              value={academic.major}
              onChange={(e) =>
                setAcademic({ ...academic, major: e.target.value })
              }
              placeholder="e.g. Computer Science"
            />
          </label>
        </section>

        {/* ── Target Internship ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Target Internship</h2>

          <div className={styles.label}>
            Company <span className={styles.required}>*</span>
            <CompanySelector
              value={target.company}
              tier={target.tier}
              onCompanyChange={(company, tier) =>
                setTarget({ ...target, company, tier })
              }
              placeholder="Search Google, Meta, Stripe…"
            />
          </div>

          <label className={styles.label}>
            Position / Field <span className={styles.required}>*</span>
            <input
              className={styles.input}
              type="text"
              value={target.position}
              onChange={(e) =>
                setTarget({ ...target, position: e.target.value })
              }
              placeholder="e.g. Software Engineering"
              required
            />
          </label>
        </section>

        {/* ── Previous Internships ── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Previous Internships</h2>
            <button
              type="button"
              onClick={addInternship}
              className={styles.addButton}
            >
              + Add
            </button>
          </div>

          {previousInternships.length === 0 && (
            <p className={styles.emptyNote}>
              No previous internships added yet.
            </p>
          )}

          {previousInternships.map((internship, index) => (
            <div key={index} className={styles.internshipCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  Internship #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeInternship(index)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>

              <div className={styles.label}>
                Company <span className={styles.required}>*</span>
                <CompanySelector
                  value={internship.company}
                  tier={internship.tier}
                  onCompanyChange={(company, tier) => {
                    updateInternship(index, "company", company);
                    updateInternship(index, "tier", tier);
                  }}
                  placeholder="e.g. Meta, Stripe…"
                />
              </div>

              <label className={styles.label}>
                Position / Field <span className={styles.required}>*</span>
                <input
                  className={styles.input}
                  type="text"
                  value={internship.position}
                  onChange={(e) =>
                    updateInternship(index, "position", e.target.value)
                  }
                  placeholder="e.g. Software Engineering"
                  required
                />
              </label>

              <label className={styles.label}>
                Duration
                <input
                  className={styles.input}
                  type="text"
                  value={internship.duration}
                  onChange={(e) =>
                    updateInternship(index, "duration", e.target.value)
                  }
                  placeholder="e.g. 3 months"
                />
              </label>
            </div>
          ))}
        </section>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Calculating…" : "Calculate My Chance"}
        </button>
      </form>

      {result && (
        <div className={styles.resultCard}>
          <h2 className={styles.resultTitle}>Your Estimated Chance</h2>
          <p className={styles.chanceDisplay}>{result.chance}%</p>
          <table className={styles.breakdownTable}>
            <tbody>
              <tr>
                <td className={styles.breakdownLabel}>Base score</td>
                <td className={styles.breakdownValue}>
                  {result.breakdown.base} pts
                </td>
              </tr>
              <tr>
                <td className={styles.breakdownLabel}>GPA bonus</td>
                <td className={styles.breakdownValue}>
                  {result.breakdown.gpaBonus} pts
                </td>
              </tr>
              <tr>
                <td className={styles.breakdownLabel}>Internship bonus</td>
                <td className={styles.breakdownValue}>
                  {result.breakdown.internshipBonus} pts
                </td>
              </tr>
              <tr>
                <td className={styles.breakdownLabel}>Total</td>
                <td className={styles.breakdownValue}>
                  {result.breakdown.total} pts
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
