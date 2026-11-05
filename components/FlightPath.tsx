export default function FlightPath() {
  return (
    <div className="flight-path" aria-hidden="true">
      <svg viewBox="0 0 1200 92" preserveAspectRatio="none">
        <g fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M94 58C240 20 340 18 470 34s180 42 300 34 180-34 336-18" strokeDasharray="4 8" />
          <rect x="38" y="34" width="44" height="30" rx="9" opacity=".7" />
          <circle cx="50" cy="48" r="4" opacity=".7" />
          <circle cx="70" cy="48" r="4" opacity=".7" />
          <path d="M48 26v8M60 26v8" opacity=".7" />
          <g opacity=".85">
            <path d="M1096 38v14M1082 45h28" strokeWidth="2.4" />
            <circle cx="1082" cy="45" r="6" />
            <circle cx="1110" cy="45" r="6" />
            <circle cx="1096" cy="45" r="4" fill="currentColor" />
          </g>
        </g>
      </svg>
      <span className="flight-path-label">BILIM → MASHQ → PARVOZ</span>
    </div>
  );
}
