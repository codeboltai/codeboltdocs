import React from 'react';
import './diagrams.css';

/**
 * Five Planes — the architectural model behind Codebolt.
 * Pure SVG. SMIL for the flowing request dot. CSS for hover-to-highlight.
 *
 * Style reference for all subsequent concept diagrams:
 *  - thin strokes (1px), rounded but small radii
 *  - monospace uppercase labels
 *  - dashed boundaries for "abstract" lines, solid for concrete data flow
 *  - one accent color (#0ea5e9) for the active path; everything else neutral
 *  - hovering a plane dims the others
 */

const PLANES = [
  {
    id: 'control',
    title: 'CONTROL',
    sub: 'config · identity · permissions',
  },
  {
    id: 'executive',
    title: 'EXECUTIVE',
    sub: 'deliberation · llm calls · tools',
  },
  {
    id: 'wait',
    title: 'WAIT & DELEGATION',
    sub: 'sub-agents · async · checkpoints',
  },
  {
    id: 'guardrails',
    title: 'GUARDRAILS',
    sub: 'policy profiles · approvals',
  },
  {
    id: 'storage',
    title: 'BUS & STORAGE',
    sub: 'event log · memory · shadow git',
  },
];

export default function FivePlanes() {
  const W = 640;
  const H = 360;
  const padX = 40;
  const padY = 30;
  const planeH = 52;
  const gap = 10;
  const planeW = W - padX * 2 - 90; // leave room for the flow arrow on the right

  return (
    <div className="cb-diagram cb-diagram--planes">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-labelledby="five-planes-title"
      >
        <title id="five-planes-title">The five planes of Codebolt</title>

        {/* planes */}
        <g className="cb-planes">
          {PLANES.map((p, i) => {
            const y = padY + i * (planeH + gap);
            return (
              <g key={p.id} className="cb-plane">
                <rect
                  x={padX}
                  y={y}
                  width={planeW}
                  height={planeH}
                  rx="3"
                  className="cb-plane-rect"
                />
                <text
                  x={padX + 16}
                  y={y + 22}
                  className="cb-plane-title"
                >
                  {p.title}
                </text>
                <text
                  x={padX + 16}
                  y={y + 38}
                  className="cb-plane-sub"
                >
                  {p.sub}
                </text>
              </g>
            );
          })}
        </g>

        {/* request flow arrow on the right */}
        <g className="cb-flow">
          <line
            x1={W - padX - 50}
            y1={padY + 6}
            x2={W - padX - 50}
            y2={padY + PLANES.length * (planeH + gap) - gap - 6}
            className="cb-flow-line"
          />
          {/* arrowhead */}
          <path
            d={`M ${W - padX - 55} ${
              padY + PLANES.length * (planeH + gap) - gap - 12
            } L ${W - padX - 50} ${
              padY + PLANES.length * (planeH + gap) - gap - 4
            } L ${W - padX - 45} ${
              padY + PLANES.length * (planeH + gap) - gap - 12
            }`}
            className="cb-flow-arrow"
          />
          {/* animated dot */}
          <circle r="3" className="cb-flow-dot">
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path={`M 0 0 L 0 ${
                PLANES.length * (planeH + gap) - gap - 12
              }`}
            />
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              keyTimes="0;1"
              values={`${W - padX - 50},${padY + 6}; ${W - padX - 50},${
                padY + PLANES.length * (planeH + gap) - gap - 6
              }`}
              calcMode="linear"
            />
          </circle>
          <text
            x={W - padX - 30}
            y={padY + 8}
            className="cb-flow-label"
          >
            request
          </text>
        </g>
      </svg>
    </div>
  );
}
