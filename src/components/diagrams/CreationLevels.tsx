import React from 'react';
import './diagrams.css';

const LEVELS = [
  { tier: 0, name: 'REMIX', sub: 'inherit + override', example: 'Markdown + frontmatter' },
  { tier: 1, name: 'FRAMEWORK', sub: 'manifest + handler fn', example: 'agent framework' },
  { tier: 2, name: 'CODEBOLTJS', sub: 'sdk-direct loop', example: '@codebolt/codeboltjs' },
  { tier: 3, name: 'RAW PROTOCOL', sub: 'speak the wire', example: 'WebSocket messages' },
  { tier: 4, name: 'VISUAL FLOW', sub: 'connect nodes', example: '.agentflow graph' },
];

export default function CreationLevels() {
  const W = 640;
  const H = 370;
  const padX = 60;
  const padY = 30;
  const rowH = 56;
  const gap = 8;

  return (
    <div className="cb-diagram cb-diagram--levels">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="creation-levels-title">
        <title id="creation-levels-title">Five ways to create a Codebolt agent</title>

        {LEVELS.map((lvl, i) => {
          const y = padY + i * (rowH + gap);
          const x = padX;
          const w = W - padX * 2;

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

      </svg>
    </div>
  );
}
