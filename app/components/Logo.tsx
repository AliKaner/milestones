export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#15151d" />
      <path
        d="M8 24 L16 16 L24 8"
        stroke="url(#logoGrad)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="24" r="3.25" fill="#15151d" stroke="url(#logoGrad)" strokeWidth="2.25" />
      <circle cx="16" cy="16" r="3.25" fill="#15151d" stroke="url(#logoGrad)" strokeWidth="2.25" />
      <circle cx="24" cy="8" r="3.5" fill="url(#logoGrad)" />
      <defs>
        <linearGradient id="logoGrad" x1="6" y1="26" x2="26" y2="6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34d399" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
