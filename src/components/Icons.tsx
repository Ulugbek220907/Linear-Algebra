export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        {/* Matrix bracket + coordinate transform vector axes */}
        <path d="M4 4h-2v16h2" />
        <path d="M20 4h2v16h-2" />
        <path d="M7 16l4-8 4 8" />
        <path d="M9 13h4" />
        <circle cx="17" cy="8" r="1.5" fill="currentColor" />
        <circle cx="7" cy="8" r="1.5" fill="currentColor" />
      </svg>
    </span>
  );
}
