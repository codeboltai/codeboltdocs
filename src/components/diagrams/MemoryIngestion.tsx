import React from 'react';
import './diagrams.css';

/**
 * Memory Ingestion — the write path:
 * Event trigger → Ingestion Pipeline → Processors → Routing → Storage destinations
 */

const W = 860;
const H = 360;

const TRIGGERS = ['conversation events', 'task events', 'job events', 'file events', 'manual'];
const PROCESSORS = ['parser', 'normalizer', 'chunker'];
const DESTINATIONS = ['Knowledge Graph', 'Vector DB', 'KV Store', 'Event Log'];

const COL1 = 40;   // triggers left edge
const COL2 = 260;  // pipeline left edge
const COL3 = 500;  // routing left edge
const COL4 = 680;  // destinations left edge

const BROW_Y = 28;
const ROW_H = 44;
const ROW_START = 60;

export default function MemoryIngestion() {
  const midY = ROW_START + (TRIGGERS.length * ROW_H) / 2 - ROW_H / 4;

  return (
    <div className="cb-diagram cb-diagram--ingestion">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="mem-ingest-title">
        <title id="mem-ingest-title">Memory ingestion write path: trigger → processors → routing → storage</title>

        <defs>
          <pattern id="ing-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill="rgba(11,13,11,0.09)" />
          </pattern>
          <marker id="ing-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#52534e" />
          </marker>
          <marker id="ing-arr-a" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#f7591f" />
          </marker>
        </defs>

        <rect width="100%" height="100%" className="cb-lc-paper" />
        <rect width="100%" height="100%" fill="url(#ing-dots)" opacity="0.5" />

        {/* Column headers */}
        <text x={COL1 + 90} y={BROW_Y} textAnchor="middle" className="cb-seq-eyebrow">TRIGGER</text>
        <text x={COL2 + 100} y={BROW_Y} textAnchor="middle" className="cb-seq-eyebrow">PROCESSORS</text>
        <text x={COL3 + 90} y={BROW_Y} textAnchor="middle" className="cb-seq-eyebrow">ROUTING</text>
        <text x={COL4 + 80} y={BROW_Y} textAnchor="middle" className="cb-seq-eyebrow">STORAGE</text>

        {/* Trigger boxes */}
        {TRIGGERS.map((t, i) => {
          const y = ROW_START + i * ROW_H;
          const cy = y + ROW_H / 2 - 4;
          return (
            <g key={t}>
              <rect x={COL1} y={y + 4} width={180} height={ROW_H - 10} rx={4}
                fill="rgba(82,83,78,0.06)" stroke="rgba(82,83,78,0.25)" strokeWidth="0.8" />
              <text x={COL1 + 90} y={cy + 5} textAnchor="middle" className="cb-lc-state-sub">{t}</text>
              {/* fan-in lines to pipeline */}
              <line x1={COL1 + 180} y1={cy} x2={COL2} y2={midY + ROW_H / 2}
                stroke="rgba(82,83,78,0.3)" strokeWidth="0.8" strokeDasharray="3 3" />
            </g>
          );
        })}

        {/* Pipeline box */}
        <rect x={COL2} y={ROW_START} width={200} height={TRIGGERS.length * ROW_H - 8} rx={5}
          fill="rgba(11,13,11,0.04)" stroke="rgba(11,13,11,0.22)" strokeWidth="1" />
        <text x={COL2 + 10} y={ROW_START + 15} className="cb-lc-state-sub" style={{ fontSize: '7px', letterSpacing: '0.08em' }}>INGESTION PIPELINE</text>

        {PROCESSORS.map((p, i) => {
          const y = ROW_START + 20 + i * 36;
          return (
            <g key={p}>
              <rect x={COL2 + 12} y={y} width={176} height={26} rx={3}
                fill="rgba(255,255,255,0.7)" stroke="rgba(11,13,11,0.15)" strokeWidth="0.7" />
              <text x={COL2 + 100} y={y + 16} textAnchor="middle" className="cb-lc-state-sub">{p}</text>
              {i < PROCESSORS.length - 1 && (
                <line x1={COL2 + 100} y1={y + 26} x2={COL2 + 100} y2={y + 36}
                  stroke="#52534e" strokeWidth="0.6" markerEnd="url(#ing-arr)" />
              )}
            </g>
          );
        })}

        {/* Pipeline → Routing arrow */}
        <line x1={COL2 + 200} y1={midY + ROW_H / 2} x2={COL3} y2={midY + ROW_H / 2}
          stroke="#52534e" strokeWidth="1.2" markerEnd="url(#ing-arr)" />

        {/* Routing box */}
        <rect x={COL3} y={ROW_START} width={160} height={TRIGGERS.length * ROW_H - 8} rx={5}
          fill="rgba(247,89,31,0.05)" stroke="rgba(247,89,31,0.22)" strokeWidth="1" />
        <text x={COL3 + 10} y={ROW_START + 15} className="cb-lc-state-sub" style={{ fontSize: '7px', letterSpacing: '0.08em', fill: 'rgba(247,89,31,0.7)' }}>ROUTING RULES</text>
        <text x={COL3 + 80} y={ROW_START + 80} textAnchor="middle" className="cb-lc-state-sub">foreach · condition</text>
        <text x={COL3 + 80} y={ROW_START + 96} textAnchor="middle" className="cb-lc-state-sub">write_to destination</text>
        <text x={COL3 + 80} y={ROW_START + 118} textAnchor="middle" className="cb-lc-state-sub">template variables</text>
        <text x={COL3 + 80} y={ROW_START + 140} textAnchor="middle" className="cb-lc-state-sub">resolved at runtime</text>

        {/* Routing → destinations fan-out */}
        {DESTINATIONS.map((d, i) => {
          const destY = ROW_START + 4 + i * ROW_H;
          const destCY = destY + ROW_H / 2 - 6;
          return (
            <g key={d}>
              <line x1={COL3 + 160} y1={midY + ROW_H / 2} x2={COL4} y2={destCY}
                stroke="rgba(247,89,31,0.4)" strokeWidth="0.8" markerEnd="url(#ing-arr-a)" />
              <rect x={COL4} y={destY} width={160} height={ROW_H - 10} rx={4}
                fill="rgba(247,89,31,0.06)" stroke="rgba(247,89,31,0.22)" strokeWidth="0.8" />
              <text x={COL4 + 80} y={destCY + 5} textAnchor="middle" className="cb-lc-state-sub">{d}</text>
            </g>
          );
        })}

        {/* Bottom caption */}
        <line x1={40} y1={H - 28} x2={W - 40} y2={H - 28} stroke="rgba(11,13,11,0.08)" strokeWidth="0.8" />
        <text x={W / 2} y={H - 12} textAnchor="middle" className="cb-lc-footnote">
          Pipelines fire on lifecycle events · processors run in sequence · routing writes to one or more storage backends
        </text>
      </svg>
    </div>
  );
}
