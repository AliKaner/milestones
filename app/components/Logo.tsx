export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#15151d" />
      {/* yükselen kontrol noktaları (milestone'lar) */}
      <circle cx="7" cy="25" r="1.9" fill="url(#logoGrad)" />
      <circle cx="12.5" cy="21.5" r="1.9" fill="url(#logoGrad)" />
      {/* zafer bayrağının direği */}
      <path
        d="M18 26.5 L18 6"
        stroke="url(#logoGrad)"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      {/* bayrak (pennant) */}
      <path d="M18.8 7 L26.5 10.25 L18.8 13.5 Z" fill="url(#logoGrad)" />
      <defs>
        <linearGradient id="logoGrad" x1="6" y1="26" x2="26" y2="6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34d399" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
