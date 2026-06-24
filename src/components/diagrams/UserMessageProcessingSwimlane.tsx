import React from 'react';
import './diagrams.css';

type LaneId = 'client' | 'runtime' | 'agent' | 'sdk' | 'llm' | 'tools';

type Lane = {
  id: LaneId;
  title: string;
  sub: string;
  x: number;
  w: number;
};

type Step = {
  id: string;
  lane: LaneId;
  y: number;
  title: string;
  sub: string[];
  accent?: boolean;
};

type Connector = {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
};

const LANES: Lane[] = [
  { id: 'client', title: 'UI / CLI', sub: 'packages/ui', x: 28, w: 134 },
  { id: 'runtime', title: 'RUNTIME', sub: 'packages/server', x: 176, w: 148 },
  { id: 'agent', title: 'AGENT', sub: 'selected worker', x: 338, w: 132 },
  { id: 'sdk', title: 'CODEBOLTJS', sub: 'sdks/codeboltjs', x: 484, w: 148 },
  { id: 'llm', title: 'LLM', sub: 'provider', x: 646, w: 116 },
  { id: 'tools', title: 'CLILIB + TOOLS', sub: 'server/src/cliLib', x: 776, w: 166 },
];

const STEPS: Step[] = [
  {
    id: 'message',
    lane: 'client',
    y: 112,
    title: 'USER MESSAGE',
    sub: ['messageResponse', 'selected agent'],
    accent: true,
  },
  {
    id: 'route',
    lane: 'runtime',
    y: 166,
    title: 'ROUTE THREAD',
    sub: ['socket / routing', 'task + thread'],
  },
  {
    id: 'spawn',
    lane: 'runtime',
    y: 222,
    title: 'SPAWN AGENT',
    sub: ['AgentProcessManager', 'project env'],
  },
  {
    id: 'connect',
    lane: 'sdk',
    y: 278,
    title: 'OPEN SOCKET',
    sub: ['initializeWebSocket', 'ws /codebolt'],
  },
  {
    id: 'deliver',
    lane: 'runtime',
    y: 334,
    title: 'DELIVER',
    sub: ['messageResponse', 'over socket'],
  },
  {
    id: 'onMessage',
    lane: 'agent',
    y: 334,
    title: 'ON MESSAGE',
    sub: ['FlatUserMessage', 'act-updated'],
    accent: true,
  },
  {
    id: 'context',
    lane: 'sdk',
    y: 400,
    title: 'GET CONTEXT',
    sub: ['project +', 'contextAssembly'],
  },
  {
    id: 'projectState',
    lane: 'runtime',
    y: 400,
    title: 'PROJECT STATE',
    sub: ['settings', 'files + repo map'],
  },
  {
    id: 'llmRequest',
    lane: 'sdk',
    y: 468,
    title: 'LLM REQUEST',
    sub: ['llm.inference', 'socket event'],
  },
  {
    id: 'model',
    lane: 'llm',
    y: 468,
    title: 'MODEL CALL',
    sub: ['provider', 'response'],
  },
  {
    id: 'toolNeed',
    lane: 'agent',
    y: 536,
    title: 'TOOL NEEDED',
    sub: ['model requested', 'next action'],
  },
  {
    id: 'toolCall',
    lane: 'sdk',
    y: 604,
    title: 'EXECUTE TOOL',
    sub: ['mcp.executeTool', 'codebolt tools'],
  },
  {
    id: 'toolRuntime',
    lane: 'tools',
    y: 604,
    title: 'RUN TOOL',
    sub: ['handleCliMessages', 'service route'],
  },
  {
    id: 'final',
    lane: 'agent',
    y: 682,
    title: 'FINAL RESULT',
    sub: ['processStoped', 'thread update'],
    accent: true,
  },
  {
    id: 'uiUpdate',
    lane: 'client',
    y: 682,
    title: 'UI UPDATE',
    sub: ['events + result', 'continue'],
  },
];

const CONNECTORS: Connector[] = [
  { from: 'message', to: 'route', label: 'socket' },
  { from: 'route', to: 'spawn' },
  { from: 'spawn', to: 'connect', label: 'env' },
  { from: 'connect', to: 'deliver', label: 'agent socket' },
  { from: 'deliver', to: 'onMessage' },
  { from: 'onMessage', to: 'context' },
  { from: 'context', to: 'projectState', label: 'request' },
  { from: 'projectState', to: 'context', label: 'context', dashed: true },
  { from: 'context', to: 'llmRequest' },
  { from: 'llmRequest', to: 'model', label: 'LLM_EVENT' },
  { from: 'model', to: 'toolNeed', label: 'response', dashed: true },
  { from: 'toolNeed', to: 'toolCall' },
  { from: 'toolCall', to: 'toolRuntime', label: 'tool event' },
  { from: 'toolRuntime', to: 'final', label: 'result', dashed: true },
  { from: 'final', to: 'uiUpdate', label: 'thread state' },
];

const STEP_H = 48;
const LANE_TOP = 42;
const LANE_H = 690;

function laneFor(id: LaneId) {
  return LANES.find((lane) => lane.id === id)!;
}

function stepFor(id: string) {
  return STEPS.find((step) => step.id === id)!;
}

function stepRect(step: Step) {
  const lane = laneFor(step.lane);
  return {
    x: lane.x + 8,
    y: step.y,
    w: lane.w - 16,
    h: STEP_H,
    cx: lane.x + lane.w / 2,
    cy: step.y + STEP_H / 2,
  };
}

function connectorPath(from: Step, to: Step) {
  const a = stepRect(from);
  const b = stepRect(to);

  if (Math.abs(a.cy - b.cy) < 2) {
    const startX = a.cx < b.cx ? a.x + a.w : a.x;
    const endX = a.cx < b.cx ? b.x : b.x + b.w;
    return `M ${startX} ${a.cy} L ${endX} ${b.cy}`;
  }

  const startX = a.cx;
  const startY = from.y < to.y ? a.y + a.h : a.y;
  const endX = b.cx;
  const endY = from.y < to.y ? b.y : b.y + b.h;
  const midY = startY + (endY - startY) / 2;

  return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
}

function renderLines(lines: string[], x: number, y: number, className: string) {
  return lines.map((line, index) => (
    <text key={line} x={x} y={y + index * 11} textAnchor="middle" className={className}>
      {line}
    </text>
  ));
}

export default function UserMessageProcessingSwimlane() {
  const W = 970;
  const H = 760;

  return (
    <div className="cb-diagram cb-diagram--message-swimlane">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="message-processing-title">
        <title id="message-processing-title">
          Swimlane flow for processing a user message through Codebolt UI or CLI, runtime, agent, codeboltjs, LLM provider, and tools
        </title>

        <defs>
          <marker id="cb-message-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10" className="cb-message-arrowhead" />
          </marker>
        </defs>

        {LANES.map((lane) => (
          <g key={lane.id}>
            <rect x={lane.x} y={LANE_TOP} width={lane.w} height={LANE_H} rx="3" className="cb-message-lane" />
            <text x={lane.x + lane.w / 2} y="68" textAnchor="middle" className="cb-message-lane-title">
              {lane.title}
            </text>
            <text x={lane.x + lane.w / 2} y="84" textAnchor="middle" className="cb-message-lane-sub">
              {lane.sub}
            </text>
          </g>
        ))}

        {CONNECTORS.map((connector) => {
          const from = stepFor(connector.from);
          const to = stepFor(connector.to);
          const path = connectorPath(from, to);
          const fromRect = stepRect(from);
          const toRect = stepRect(to);
          const labelX = (fromRect.cx + toRect.cx) / 2;
          const labelY = (fromRect.cy + toRect.cy) / 2 - 4;

          return (
            <g key={`${connector.from}-${connector.to}`}>
              <path
                d={path}
                fill="none"
                markerEnd="url(#cb-message-arrow)"
                className={connector.dashed ? 'cb-message-wire cb-message-wire--dashed' : 'cb-message-wire'}
              />
              {connector.label ? (
                <text x={labelX} y={labelY} textAnchor="middle" className="cb-message-label">
                  {connector.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {STEPS.map((step) => {
          const rect = stepRect(step);

          return (
            <g key={step.id} className="cb-message-step">
              <rect
                x={rect.x}
                y={rect.y}
                width={rect.w}
                height={rect.h}
                rx="3"
                className={step.accent ? 'cb-message-step-rect cb-message-step-rect--accent' : 'cb-message-step-rect'}
              />
              <text x={rect.cx} y={rect.y + 18} textAnchor="middle" className="cb-message-step-title">
                {step.title}
              </text>
              {renderLines(step.sub, rect.cx, rect.y + 32, 'cb-message-step-sub')}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
