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
  large?: boolean;
};

const OTHER_EXTERNAL: Box[] = [
  { x: 40, y: 122, w: 104, h: 54, title: 'SKILL' },
  { x: 40, y: 204, w: 104, h: 54, title: 'MCP' },
];

const OTHER_APP: Box = {
  x: 164,
  y: 86,
  w: 260,
  h: 250,
  title: 'APPLICATION',
  sub: 'agent loop lives inside',
  accent: true,
  large: true,
};

const OTHER_INTERNAL: Box[] = [
  { x: 196, y: 128, w: 196, h: 62, title: 'INTERNAL TOOL' },
  { x: 196, y: 222, w: 196, h: 62, title: 'AGENT LOOP' },
];

const CODEBOLT_EXTERNAL: Box[] = [
  { x: 492, y: 104, w: 112, h: 54, title: 'PLUGINS' },
  { x: 492, y: 184, w: 112, h: 54, title: 'MCP' },
  { x: 492, y: 264, w: 112, h: 54, title: 'SKILL' },
];

const CODEBOLT_RUNTIME: Box = {
  x: 628,
  y: 94,
  w: 282,
  h: 258,
  title: 'CODEBOLT RUNTIME',
  sub: 'platform capabilities',
  accent: true,
  large: true,
};

const CODEBOLT_INTERNAL: Box[] = [
  { x: 680, y: 138, w: 178, h: 62, title: 'INTERNAL TOOL' },
];

const CODEBOLT_AGENT_LOOP: Box = {
  x: 934,
  y: 202,
  w: 116,
  h: 68,
  title: 'AGENT LOOP',
  sub: 'your control',
};

function renderBox(box: Box) {
  const cx = box.x + box.w / 2;
  const titleY = box.y + (box.large ? 24 : box.h / 2 + (box.sub ? -7 : 4));
  const subY = box.y + (box.large ? 43 : box.h / 2 + 12);

  return (
    <g key={`${box.title}-${box.x}-${box.y}`} className="cb-runtime-compare-box">
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx="3"
        className={box.accent ? 'cb-runtime-compare-rect cb-runtime-compare-rect--accent' : 'cb-runtime-compare-rect'}
      />
      <text x={cx} y={titleY} textAnchor="middle" className="cb-runtime-compare-title">
        {box.title}
      </text>
      {box.sub ? (
        <text x={cx} y={subY} textAnchor="middle" className="cb-runtime-compare-sub">
          {box.sub}
        </text>
      ) : null}
    </g>
  );
}

export default function RuntimeComparison() {
  const W = 1090;
  const H = 430;

  return (
    <div className="cb-diagram cb-diagram--runtime-comparison">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="runtime-comparison-title">
        <title id="runtime-comparison-title">
          Comparison of other agent applications and the Codebolt runtime model
        </title>

        <defs>
          <marker id="cb-runtime-compare-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10" className="cb-runtime-compare-arrowhead" />
          </marker>
        </defs>

        <text x="294" y="48" textAnchor="middle" className="cb-runtime-compare-heading">
          OTHER
        </text>
        <text x="770" y="48" textAnchor="middle" className="cb-runtime-compare-heading">
          CODEBOLT
        </text>

        {OTHER_EXTERNAL.map(renderBox)}
        {renderBox(OTHER_APP)}
        {OTHER_INTERNAL.map(renderBox)}

        {CODEBOLT_EXTERNAL.map(renderBox)}
        {renderBox(CODEBOLT_RUNTIME)}
        {CODEBOLT_INTERNAL.map(renderBox)}
        {renderBox(CODEBOLT_AGENT_LOOP)}

        <path
          d="M 144 149 C 154 149 156 149 164 149"
          fill="none"
          className="cb-runtime-compare-wire cb-runtime-compare-wire--soft"
          markerEnd="url(#cb-runtime-compare-arrow)"
        />
        <path
          d="M 144 231 C 154 231 156 231 164 231"
          fill="none"
          className="cb-runtime-compare-wire cb-runtime-compare-wire--soft"
          markerEnd="url(#cb-runtime-compare-arrow)"
        />
        <path
          d="M 604 131 C 614 131 618 131 628 131"
          fill="none"
          className="cb-runtime-compare-wire cb-runtime-compare-wire--soft"
          markerEnd="url(#cb-runtime-compare-arrow)"
        />
        <path
          d="M 604 211 C 614 211 618 211 628 211"
          fill="none"
          className="cb-runtime-compare-wire cb-runtime-compare-wire--soft"
          markerEnd="url(#cb-runtime-compare-arrow)"
        />
        <path
          d="M 604 291 C 614 291 618 291 628 291"
          fill="none"
          className="cb-runtime-compare-wire cb-runtime-compare-wire--soft"
          markerEnd="url(#cb-runtime-compare-arrow)"
        />
        <path
          d="M 910 236 C 920 236 924 236 934 236"
          fill="none"
          className="cb-runtime-compare-wire"
          markerEnd="url(#cb-runtime-compare-arrow)"
        />

        <text x="294" y="372" textAnchor="middle" className="cb-runtime-compare-note">
          Tools and loop are bundled into the app.
        </text>
        <text x="770" y="388" textAnchor="middle" className="cb-runtime-compare-note">
          Runtime exposes capabilities; the agent loop stays outside and programmable.
        </text>
      </svg>
    </div>
  );
}
