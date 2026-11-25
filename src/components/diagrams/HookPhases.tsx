import React from 'react';
import './diagrams.css';

/**
 * Hook Phases — a horizontal agent-turn timeline with named tap points
 * where hooks can intercept.
 */

const PHASES = [
  { x: 60, label: 'userPromptSubmit' },
  { x: 200, label: 'agentSessionStart' },
  { x: 340, label: 'preToolUse' },
  { x: 480, label: 'postToolUse' },
  { x: 600, label: 'agentSessionEnd' },
];

export default function HookPhases() {
  const W = 680;
  const H = 240;
  const trackY = 130;

  return (
    <div className="cb-diagram cb-diagram--hooks">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="hook-phases-title">
        <title id="hook-phases-title">Example runtime events during a session</title>

        {/* baseline track */}
        <line x1="40" y1={trackY} x2={W - 40} y2={trackY} className="cb-track" />
        <path d={`M ${W - 48} ${trackY - 5} L ${W - 40} ${trackY} L ${W - 48} ${trackY + 5}`} className="cb-arrowhead" />

        {/* turn label */}
        <text x="40" y="40" className="cb-section-label">EXAMPLE SESSION EVENTS</text>
        <text x={W - 40} y={trackY + 30} textAnchor="end" className="cb-axis-label">time →</text>

        {/* phase ticks */}
        {PHASES.map((p) => (
          <g key={p.label} className="cb-phase">
            <line x1={p.x} y1={trackY - 8} x2={p.x} y2={trackY + 8} className="cb-tick" />
            <circle cx={p.x} cy={trackY} r="4" className="cb-phase-dot" />
            {/* hook arrow above */}
            <line x1={p.x} y1={trackY - 16} x2={p.x} y2={trackY - 50} className="cb-hook-line" />
            <rect x={p.x - 60} y={trackY - 78} width="120" height="24" rx="2" className="cb-hook-box" />
            <text x={p.x} y={trackY - 62} textAnchor="middle" className="cb-hook-label">
              {p.label}
            </text>
          </g>
        ))}

        {/* legend */}
        <g transform={`translate(40 ${H - 30})`}>
          <circle cx="0" cy="0" r="3" className="cb-phase-dot" />
          <text x="10" y="4" className="cb-legend">phase</text>
          <rect x="80" y="-8" width="22" height="14" rx="2" className="cb-hook-box" />
          <text x="108" y="4" className="cb-legend">handler behavior depends on the event</text>
        </g>
      </svg>
    </div>
  );
}
