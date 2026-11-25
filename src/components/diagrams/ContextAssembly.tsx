import React from 'react';
import './diagrams.css';

/**
 * Context Assembly Pipeline — sources fan in, processors transform,
 * LLM consumes the result.
 */

const SOURCES = ['request input', 'scopes', 'memory names', 'rule engines'];
const PROCESSORS = ['select memories', 'run pipelines', 'deduplicate + group', 'apply token budget'];

export default function ContextAssembly() {
  const W = 720;
  const H = 320;

  const srcX = 60;
  const procX = 320;
  const llmX = 580;

  return (
    <div className="cb-diagram cb-diagram--assembly">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="context-assembly-title">
        <title id="context-assembly-title">The context assembly pipeline</title>

        {/* sources */}
        <text x={srcX + 60} y="30" textAnchor="middle" className="cb-section-label">SOURCES</text>
        {SOURCES.map((s, i) => {
          const y = 60 + i * 44;
          return (
            <g key={s}>
              <rect x={srcX} y={y} width={130} height={30} rx="2" className="cb-box" />
              <text x={srcX + 65} y={y + 19} textAnchor="middle" className="cb-box-sub">{s}</text>
              <line x1={srcX + 130} y1={y + 15} x2={procX} y2={H / 2} className="cb-flow-line" />
            </g>
          );
        })}

        {/* processor pipeline */}
        <text x={procX + 95} y="30" textAnchor="middle" className="cb-section-label">ASSEMBLY</text>
        <rect x={procX} y={70} width={190} height={180} rx="3" className="cb-box cb-box--accent" />
        {PROCESSORS.map((p, i) => {
          const y = 92 + i * 38;
          return (
            <g key={p}>
              <rect x={procX + 18} y={y} width={154} height={26} rx="2" className="cb-pipe-step" />
              <text x={procX + 95} y={y + 17} textAnchor="middle" className="cb-box-sub">{p}</text>
              {i < PROCESSORS.length - 1 && (
                <line x1={procX + 95} y1={y + 26} x2={procX + 95} y2={y + 38} className="cb-pipe-arrow" />
              )}
            </g>
          );
        })}

        {/* arrow proc → llm */}
        <line x1={procX + 190} y1={H / 2} x2={llmX} y2={H / 2} className="cb-arrow" />
        <path d={`M ${llmX - 8} ${H / 2 - 4} L ${llmX} ${H / 2} L ${llmX - 8} ${H / 2 + 4}`} className="cb-arrowhead" />

        {/* LLM */}
        <text x={llmX + 50} y="30" textAnchor="middle" className="cb-section-label">RESULT</text>
        <rect x={llmX} y={H / 2 - 28} width={110} height={56} rx="3" className="cb-box" />
        <text x={llmX + 55} y={H / 2 + 4} textAnchor="middle" className="cb-box-title">Context + trace</text>
      </svg>
    </div>
  );
}
