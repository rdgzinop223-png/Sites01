export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand">
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path
          d="M19.5 4 35 32H5L15.5 13l5 9-4.5 8H29L19.5 12"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        <path d="m5 32 12-2M29 30l6 2" stroke="currentColor" strokeWidth="2" />
      </svg>
      {!compact && (
        <span>
          Lonyx<span className="accent">Web</span>
          <span className="brand-dot">®</span>
        </span>
      )}
    </span>
  );
}
