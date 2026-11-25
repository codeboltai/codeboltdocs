import React from 'react';
import './diagrams.css';

/**
 * Four creation levels for custom agents — pyramid from highest abstraction
 * (Remix) at top to lowest (Raw WebSocket) at the base.
 */

const LEVELS = [
  { tier: 0, name: 'REMIX', sub: 'inherit + override', example: 'Markdown + frontmatter' },
  { tier: 1, name: 'FRAMEWORK', sub: 'manifest + handler fn', example: 'agent framework' },
  { tier: 2, name: 'CODEBOLTJS', sub: 'sdk-direct loop', example: '@codebolt/codeboltjs' },
  { tier: 3, name: 'RAW PROTOCOL', sub: 'speak the wire', example: 'WebSocket JSON-RPC' },
];

export default function CreationLevels() {
  const W = 640;
  const H = 320;
  const padX = 60;
  const padY = 30;
  const rowH = 56;
  const gap = 8;

  return (
    <div className="cb-diagram cb-diagram--levels">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="creation-levels-title">
        <title id="creation-levels-title">Four levels for authoring custom agents</title>

        {LEVELS.map((lvl, i) => {
          const y = padY + i * (rowH + gap);
          // Pyramid: top is narrowest, bottom widest
          const widthFactor = 0.55 + (i / (LEVELS.length - 1)) * 0.45;
          const w = (W - padX * 2) * widthFactor;
          const x = (W - w) / 2;

          return (
            <g key={lvl.tier} className="cb-level">
              <rect x={x} y={y} width={w} height={rowH} rx="3" className="cb-level-rect" />
              <text x={x + 18} y={y + 22} className="cb-level-tier">
                LEVEL {lvl.tier}
              </text>
              <text x={x + 18} y={y + 40} className="cb-level-name">
                {lvl.name}
              </text>
              <text x={x + w - 18} y={y + 22} textAnchor="end" className="cb-level-sub">
                {lvl.sub}
              </text>
              <text x={x + w - 18} y={y + 40} textAnchor="end" className="cb-level-example">
                {lvl.example}
              </text>
            </g>
          );
        })}

        {/* abstraction arrow */}
        <g className="cb-level-axis">
          <line x1={26} y1={padY + 8} x2={26} y2={padY + LEVELS.length * (rowH + gap) - gap - 8} className="cb-level-axis-line" />
          <text x={20} y={padY + 12} className="cb-level-axis-label">HIGH</text>
          <text x={20} y={padY + LEVELS.length * (rowH + gap) - gap - 4} className="cb-level-axis-label">LOW</text>
          <text x={14} y={H / 2} className="cb-level-axis-title" transform={`rotate(-90 14 ${H / 2})`}>
            ABSTRACTION
          </text>
        </g>
      </svg>
    </div>
  );
}
