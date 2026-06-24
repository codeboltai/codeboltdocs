import React from 'react';
import './diagrams.css';

type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent?: boolean;
};

const OTHER_CAPABILITIES: Box[] = [
  { x: 42, y: 110, w: 166, h: 54, title: 'ENV SCALING', sub: 'external' },
  { x: 42, y: 196, w: 166, h: 54, title: 'VERIFY LOOP', sub: 'external' },
  { x: 42, y: 282, w: 166, h: 68, title: 'CODE MERGING', sub: 'GitHub PR external' },
];

const CODEBOLT_CAPABILITIES: Box[] = [
  { x: 650, y: 114, w: 190, h: 54, title: 'ENV SCALING', sub: 'built in' },
  { x: 650, y: 190, w: 190, h: 54, title: 'VERIFY LOOP', sub: 'built in' },
  { x: 650, y: 266, w: 190, h: 68, title: 'CODE MERGING', sub: 'GitHub PR built in' },
];

const CUSTOM_AGENT: Box[] = [
  { x: 880, y: 128, w: 178, h: 62, title: 'CUSTOM AGENT', sub: 'chooses process' },
  { x: 884, y: 228, w: 170, h: 54, title: 'DETERMINISTIC', sub: 'process code' },
  { x: 884, y: 308, w: 170, h: 54, title: 'AGENT DRIVEN', sub: 'model loop' },
];

function renderBox(box: Box) {
  const cx = box.x + box.w / 2;
  const titleY = box.y + box.h / 2 + (box.sub ? -7 : 4);
  const subY = box.y + box.h / 2 + 12;

  return (
    <g key={`${box.title}-${box.x}-${box.y}`} className="cb-capcontrol-box">
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx="3"
        className={box.accent ? 'cb-capcontrol-rect cb-capcontrol-rect--accent' : 'cb-capcontrol-rect'}
      />
      <text x={cx} y={titleY} textAnchor="middle" className="cb-capcontrol-title">
        {box.title}
      </text>
      {box.sub ? (
        <text x={cx} y={subY} textAnchor="middle" className="cb-capcontrol-sub">
          {box.sub}
        </text>
      ) : null}
    </g>
  );
}

export default function RuntimeCapabilityControl() {
  const W = 1090;
  const H = 440;

  return (
    <div className="cb-diagram cb-diagram--capability-control">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="capability-control-title">
        <title id="capability-control-title">
          Comparison of assembled agent capabilities and Codebolt runtime capabilities controlled by custom agents
        </title>

        <defs>
          <marker id="cb-capcontrol-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10" className="cb-capcontrol-arrowhead" />
          </marker>
        </defs>

        <text x="316" y="46" textAnchor="middle" className="cb-capcontrol-heading">
          OTHER
        </text>
        <text x="700" y="46" textAnchor="middle" className="cb-capcontrol-heading">
          CODEBOLT RUNTIME
        </text>

        <rect x="244" y="86" width="240" height="264" rx="3" className="cb-capcontrol-container" />
        <text x="364" y="126" textAnchor="middle" className="cb-capcontrol-title">
          APPLICATION
        </text>
        <rect x="300" y="184" width="128" height="58" rx="3" className="cb-capcontrol-rect cb-capcontrol-rect--accent" />
        <text x="364" y="208" textAnchor="middle" className="cb-capcontrol-title">
          AGENT
        </text>
        <text x="364" y="224" textAnchor="middle" className="cb-capcontrol-sub">
          wires workflow
        </text>

        {OTHER_CAPABILITIES.map(renderBox)}

        <rect x="604" y="82" width="254" height="284" rx="3" className="cb-capcontrol-container cb-capcontrol-container--accent" />
        <text x="731" y="356" textAnchor="middle" className="cb-capcontrol-note">
          features are built into the runtime
        </text>

        {CODEBOLT_CAPABILITIES.map(renderBox)}
        {CUSTOM_AGENT.map((box, index) => renderBox({ ...box, accent: index === 0 }))}

        <path
          d="M 858 159 C 868 159 870 159 880 159"
          fill="none"
          className="cb-capcontrol-wire"
          markerEnd="url(#cb-capcontrol-arrow)"
        />
        <path
          d="M 969 190 L 969 228"
          fill="none"
          className="cb-capcontrol-wire"
          markerEnd="url(#cb-capcontrol-arrow)"
        />
        <path
          d="M 969 282 L 969 308"
          fill="none"
          className="cb-capcontrol-wire"
          markerEnd="url(#cb-capcontrol-arrow)"
        />

        <text x="364" y="394" textAnchor="middle" className="cb-capcontrol-note">
          these concerns are handled outside the app
        </text>
        <text x="969" y="394" textAnchor="middle" className="cb-capcontrol-note">
          you decide what runs, how it runs, and whether code or the agent drives it
        </text>
      </svg>
    </div>
  );
}
