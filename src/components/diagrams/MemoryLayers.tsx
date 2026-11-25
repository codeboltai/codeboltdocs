import React from 'react';
import './diagrams.css';

/**
 * Memory Layers — vertical stack from ephemeral working memory at top
 * to persistent long-term stores at the bottom.
 */

const LAYERS = [
  { name: 'WORKING', lifetime: 'one turn', use: 'scratchpad' },
  { name: 'EPISODIC', lifetime: 'persistent', use: 'recorded events' },
  { name: 'KV', lifetime: 'persistent', use: 'small key→value' },
  { name: 'JSON', lifetime: 'persistent', use: 'structured records' },
  { name: 'MARKDOWN', lifetime: 'persistent', use: 'formatted text' },
  { name: 'KNOWLEDGE GRAPH', lifetime: 'persistent', use: 'entities + relations' },
  { name: 'VECTOR', lifetime: 'persistent', use: 'semantic search' },
];

export default function MemoryLayers() {
  const W = 640;
  const rowH = 38;
  const padY = 50;
  const padX = 60;
  const H = padY * 2 + LAYERS.length * rowH;

  return (
    <div className="cb-diagram cb-diagram--memory">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="memory-layers-title">
        <title id="memory-layers-title">The memory layers available to a Codebolt agent</title>

        <text x={padX} y={padY - 18} className="cb-section-label">EPHEMERAL ↑</text>
        <text x={padX} y={H - padY + 28} className="cb-section-label">PERSISTENT ↓</text>

        {LAYERS.map((l, i) => {
          const y = padY + i * rowH;
          const widthScale = 0.6 + (i / (LAYERS.length - 1)) * 0.4;
          const w = (W - padX * 2) * widthScale;
          return (
            <g key={l.name}>
              <rect x={(W - w) / 2} y={y + 4} width={w} height={rowH - 8} rx="2" className="cb-mem-rect" />
              <text x={W / 2 - 100} y={y + 25} className="cb-mem-name">{l.name}</text>
              <text x={W / 2 + 30} y={y + 25} className="cb-mem-lifetime">{l.lifetime}</text>
              <text x={W / 2 + 130} y={y + 25} className="cb-mem-use">{l.use}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
