import React from 'react';
import './diagrams.css';

/**
 * Agent Loop — the per-turn deliberation cycle.
 * Six steps arranged in a circle, with an animated dot tracing the loop.
 */

const STEPS = [
  { id: 'context', label: 'ASSEMBLE', sub: 'context' },
  { id: 'llm', label: 'CALL LLM', sub: 'reason' },
  { id: 'vet', label: 'VET', sub: 'guardrails' },
  { id: 'tools', label: 'EXECUTE', sub: 'tools' },
  { id: 'observe', label: 'OBSERVE', sub: 'results' },
  { id: 'record', label: 'CONTINUE?', sub: 'check result' },
];

export default function AgentLoop() {
  const W = 560;
  const H = 360;
  const cx = W / 2;
  const cy = H / 2;
  const r = 130;

  const points = STEPS.map((s, i) => {
    const angle = (i / STEPS.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...s,
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  });

  // Build the circular motion path
  const motionPath = [
    `M ${points[0].x} ${points[0].y}`,
    ...points.slice(1).map((p) => `L ${p.x} ${p.y}`),
    `L ${points[0].x} ${points[0].y}`,
  ].join(' ');

  return (
    <div className="cb-diagram cb-diagram--loop">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="agent-loop-title">
        <title id="agent-loop-title">The agent deliberation loop</title>

        {/* loop circle */}
        <circle cx={cx} cy={cy} r={r} className="cb-loop-ring" />

        {/* connecting arcs (visible loop trail) */}
        {points.map((p, i) => {
          const next = points[(i + 1) % points.length];
          return (
            <line
              key={`edge-${i}`}
              x1={p.x}
              y1={p.y}
              x2={next.x}
              y2={next.y}
              className="cb-loop-edge"
            />
          );
        })}

        {/* step nodes */}
        {points.map((p) => (
          <g key={p.id} className="cb-loop-node">
            <circle cx={p.x} cy={p.y} r="22" className="cb-loop-node-bg" />
            <text x={p.x} y={p.y - 1} textAnchor="middle" className="cb-loop-node-label">
              {p.label}
            </text>
            <text x={p.x} y={p.y + 11} textAnchor="middle" className="cb-loop-node-sub">
              {p.sub}
            </text>
          </g>
        ))}

        {/* animated dot */}
        <circle r="4" className="cb-loop-dot">
          <animateMotion dur="6s" repeatCount="indefinite" path={motionPath} />
        </circle>

        {/* center label */}
        <text x={cx} y={cy - 4} textAnchor="middle" className="cb-loop-center">
          ONE TURN
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="cb-loop-center-sub">
          repeat until done
        </text>
      </svg>
    </div>
  );
}
