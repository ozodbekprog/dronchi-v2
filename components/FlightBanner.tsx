const DESKTOP_PATH =
  "M 850 293 C 900 265 1040 200 1210 163 C 1290 148 1400 172 1470 187 C 1520 195 1560 200 1600 199 C 1618 198 1618 170 1626 143 C 1636 112 1664 98 1692 99 C 1722 100 1747 118 1752 148 C 1757 178 1739 199 1712 208 C 1690 215 1668 213 1652 207 C 1676 221 1720 238 1770 252 C 1850 273 1960 290 2010 296 C 2100 309 2250 350 2330 361 C 2400 371 2500 384 2570 386 C 2620 387 2640 386 2650 383 C 2700 375 2800 350 2850 337 C 2900 324 2970 280 3010 255 C 3045 233 3085 200 3101 183";

const DESKTOP_MOTION_PATH =
  "M 850 293 C 900 265 1040 200 1210 163 C 1290 148 1400 172 1470 187 C 1520 195 1560 200 1600 199 C 1640 203 1690 220 1770 252 C 1850 273 1960 290 2010 296 C 2100 309 2250 350 2330 361 C 2400 371 2500 384 2570 386 C 2620 387 2640 386 2650 383 C 2700 375 2800 350 2850 337 C 2900 324 2970 280 3010 255 C 3045 233 3085 200 3101 183";

const MOBILE_PATH =
  "M 470 388 C 560 340 640 320 740 315 C 850 310 980 280 1070 240";

function Defs({
  id,
  clip,
}: {
  id: string;
  clip: { x: number; y: number; width: number; height: number; rx: number };
}) {
  return (
    <defs>
      <linearGradient id={`${id}-card-day`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f6faff" />
        <stop offset="0.55" stopColor="#eef6ff" />
        <stop offset="1" stopColor="#e6f0fd" />
      </linearGradient>
      <linearGradient id={`${id}-card-night`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#122a50" />
        <stop offset="0.55" stopColor="#0e2244" />
        <stop offset="1" stopColor="#0a1830" />
      </linearGradient>
      <linearGradient
        id={`${id}-path-day`}
        gradientUnits="userSpaceOnUse"
        x1="850"
        y1="293"
        x2="3101"
        y2="183"
      >
        <stop offset="0" stopColor="#7fbcfa" />
        <stop offset="0.55" stopColor="#75c9fa" />
        <stop offset="1" stopColor="#6bddf6" />
      </linearGradient>
      <linearGradient
        id={`${id}-path-night`}
        gradientUnits="userSpaceOnUse"
        x1="850"
        y1="293"
        x2="3101"
        y2="183"
      >
        <stop offset="0" stopColor="#6d96ff" />
        <stop offset="0.55" stopColor="#5cc8ff" />
        <stop offset="1" stopColor="#5ce8f7" />
      </linearGradient>
      <radialGradient id={`${id}-halo`}>
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="0.45" stopColor="#d8f3ff" stopOpacity="0.4" />
        <stop offset="1" stopColor="#d8f3ff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-glow`}>
        <stop offset="0" stopColor="#a8d4ff" stopOpacity="0.5" />
        <stop offset="1" stopColor="#a8d4ff" stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="22" />
      </filter>
      <clipPath id={`${id}-clip`}>
        <rect x={clip.x} y={clip.y} width={clip.width} height={clip.height} rx={clip.rx} />
      </clipPath>
    </defs>
  );
}

export default function FlightBanner() {
  return (
    <section className="section flight-section">
      <div className="container">
        <div
          className="flight-banner"
          role="img"
          aria-label="BILIM → MASHQ → PARVOZ — boshqaruv pultidan dronning parvoz yo'li"
        >
          <svg
            className="flight-scene flight-scene-desktop"
            viewBox="0 0 3320 530"
            aria-hidden="true"
          >
            <Defs id="fb" clip={{ x: 30, y: 28, width: 3260, height: 474, rx: 58 }} />
            <rect className="fb-card" x="30" y="28" width="3260" height="474" rx="58" />
            <g clipPath="url(#fb-clip)">
              <path
                className="fb-ribbon"
                d="M -60 470 C 160 300 420 320 760 500 L -60 540 Z"
                filter="url(#fb-blur)"
              />
              <path
                className="fb-ribbon"
                d="M 2500 540 C 2800 430 3040 320 3340 90 L 3340 540 Z"
                filter="url(#fb-blur)"
              />
              <circle
                className="fb-ring"
                cx="560"
                cy="300"
                r="250"
                fill="none"
                stroke="#fff"
                strokeWidth="70"
                filter="url(#fb-blur)"
              />
              <ellipse className="fb-night-glow" cx="520" cy="300" rx="360" ry="250" fill="url(#fb-glow)" />
              <ellipse className="fb-night-glow" cx="2660" cy="265" rx="420" ry="260" fill="url(#fb-glow)" />

              <path className="fb-path-halo" d={DESKTOP_PATH} />
              <path className="fb-path" d={DESKTOP_PATH} />
              <path id="fb-flight-path" d={DESKTOP_MOTION_PATH} fill="none" stroke="none" />

              <g className="fb-dot">
                <circle cx="1224" cy="163" r="30" fill="url(#fb-halo)" />
                <circle cx="1224" cy="163" r="6" fill="#fff" />
              </g>
              <g className="fb-dot">
                <circle className="fb-dot-halo" cx="3101" cy="183" r="38" fill="url(#fb-halo)" />
                <circle cx="3101" cy="183" r="7.5" fill="#fff" />
              </g>

              <image
                className="fb-controller"
                href="/images/flight-controller.webp"
                x="289"
                y="45"
                width="544"
                height="445"
              />

              <g className="fb-drone-static" transform="translate(2656 265) rotate(-4)">
                <image
                  className="fb-drone-img"
                  href="/images/flight-drone.webp"
                  x="-302"
                  y="-181"
                  width="604"
                  height="362"
                />
              </g>

              <g className="fb-drone-anim">
                <image
                  className="fb-drone-img"
                  href="/images/flight-drone.webp"
                  x="-242"
                  y="-145"
                  width="484"
                  height="290"
                />
                <animateMotion
                  dur="18s"
                  repeatCount="indefinite"
                  rotate="auto"
                  keyPoints="0.09;1"
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href="#fb-flight-path" />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;1;0;0"
                  keyTimes="0;0.03;0.88;0.93;0.97;1"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </g>

            </g>
          </svg>

          <svg
            className="flight-scene flight-scene-mobile"
            viewBox="0 0 1200 720"
            aria-hidden="true"
          >
            <Defs id="fbm" clip={{ x: 16, y: 16, width: 1168, height: 688, rx: 48 }} />
            <rect className="fb-card" x="16" y="16" width="1168" height="688" rx="48" />
            <g clipPath="url(#fbm-clip)">
              <path
                className="fb-ribbon"
                d="M -40 620 C 150 480 340 500 600 700 L -40 740 Z"
                filter="url(#fbm-blur)"
              />
              <path
                className="fb-ribbon"
                d="M 820 740 C 1000 600 1130 460 1240 200 L 1240 740 Z"
                filter="url(#fbm-blur)"
              />
              <ellipse className="fb-night-glow" cx="280" cy="430" rx="260" ry="220" fill="url(#fbm-glow)" />
              <ellipse className="fb-night-glow" cx="930" cy="260" rx="300" ry="220" fill="url(#fbm-glow)" />

              <path className="fb-path-halo" d={MOBILE_PATH} />
              <path id="fbm-flight-path" className="fb-path" d={MOBILE_PATH} />

              <g className="fb-dot">
                <circle className="fb-dot-halo" cx="1070" cy="240" r="34" fill="url(#fbm-halo)" />
                <circle cx="1070" cy="240" r="7" fill="#fff" />
              </g>

              <image
                className="fb-controller"
                href="/images/flight-controller.webp"
                x="70"
                y="300"
                width="380"
                height="311"
              />

              <g className="fb-drone-static" transform="translate(940 269) rotate(-4)">
                <image
                  className="fb-drone-img"
                  href="/images/flight-drone.webp"
                  x="-200"
                  y="-120"
                  width="400"
                  height="240"
                />
              </g>

              <g className="fb-drone-anim">
                <image
                  className="fb-drone-img"
                  href="/images/flight-drone.webp"
                  x="-165"
                  y="-98"
                  width="331"
                  height="197"
                />
                <animateMotion
                  dur="13s"
                  repeatCount="indefinite"
                  rotate="auto"
                  keyPoints="0.16;1"
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href="#fbm-flight-path" />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;1;0;0"
                  keyTimes="0;0.04;0.86;0.92;0.96;1"
                  dur="13s"
                  repeatCount="indefinite"
                />
              </g>

            </g>
          </svg>
          <span className="fb-caption-html" aria-hidden="true">
            BILIM → MASHQ → PARVOZ
          </span>
          <span className="fb-caption-html fb-caption-html-m" aria-hidden="true">
            BILIM → MASHQ → PARVOZ
          </span>
        </div>
      </div>
    </section>
  );
}
