import React from 'react';
import './diagrams.css';

type TextLine = {
  text: string;
  className?: string;
};

type Concept = {
  id: string;
  title: string;
  eyebrow: string;
  lines: TextLine[];
  className?: string;
};

const TABS = [
  { x: 82, w: 132, label: 'New Chat' },
  { x: 214, w: 170, label: 'Thread a633...' },
  { x: 384, w: 132, label: 'New Chat' },
  { x: 516, w: 132, label: 'New Chat' },
  { x: 648, w: 48, label: 'New' },
];

const CONCEPTS: Concept[] = [
  {
    id: 'next',
    title: 'Next step',
    eyebrow: 'same thread',
    lines: [{ text: 'A queued future agent loop.' }, { text: 'Can use another selected agent.' }],
    className: 'cb-threadsteps-step--next',
  },
  {
    id: 'steering',
    title: 'Steering',
    eyebrow: 'current step',
    lines: [{ text: 'Guides the running agent loop.' }, { text: 'Not replayed as a new run.' }],
    className: 'cb-threadsteps-step--active',
  },
  {
    id: 'sub-agent',
    title: 'Sub-agent',
    eyebrow: 'child run',
    lines: [{ text: 'Spawned under the active agent.' }, { text: 'Linked by parentAgentInstanceId.' }],
  },
  {
    id: 'sub-thread',
    title: 'Sub-thread',
    eyebrow: 'child thread',
    lines: [{ text: 'Separate thread for delegated work.' }, { text: 'Linked back with parentId.' }],
  },
  {
    id: 'background-thread',
    title: 'Background thread',
    eyebrow: 'detached work',
    lines: [{ text: 'Runs beside the main thread.' }, { text: 'Can use same or other environment.' }],
  },
];

const CHAT_LINKS = [
  { id: 'next', fromX: 754, fromY: 168, toY: 154 },
  { id: 'steering', fromX: 762, fromY: 307, toY: 240 },
  { id: 'sub-agent', fromX: 754, fromY: 394, toY: 326 },
  { id: 'sub-thread', fromX: 754, fromY: 444, toY: 412 },
  { id: 'background-thread', fromX: 754, fromY: 535, toY: 498 },
];

function renderLines(lines: TextLine[] | undefined, x: number, y: number, textAnchor: 'start' | 'middle' = 'middle') {
  if (!lines?.length) return null;

  return lines.map((line, index) => (
    <text key={`${line.text}-${index}`} x={x} y={y + index * 14} textAnchor={textAnchor} className={line.className || 'cb-threadsteps-copy'}>
      {line.text}
    </text>
  ));
}

function renderConceptCard(concept: Concept, x: number, y: number) {
  const cardClass = concept.className ? `cb-threadsteps-concept-card ${concept.className}` : 'cb-threadsteps-concept-card';

  return (
    <g key={concept.id} className="cb-threadsteps-card">
      <rect x={x} y={y} width="292" height="76" rx="6" className={cardClass} />
      <text x={x + 18} y={y + 23} className="cb-threadsteps-card-title">
        {concept.title}
      </text>
      <text x={x + 274} y={y + 23} textAnchor="end" className="cb-threadsteps-chip">
        {concept.eyebrow}
      </text>
      {renderLines(concept.lines, x + 18, y + 47, 'start')}
    </g>
  );
}

export default function ThreadStepsFlow() {
  const W = 1180;
  const H = 600;

  return (
    <div className="cb-diagram cb-diagram--threadsteps">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="threadsteps-title">
        <title id="threadsteps-title">
          Chat window showing Codebolt threads, steps, steering, sub-agents, sub-threads, and background threads
        </title>

        <defs>
          <marker id="cb-threadsteps-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10" className="cb-threadsteps-arrowhead" />
          </marker>
        </defs>

        <rect x="24" y="22" width="780" height="548" rx="8" className="cb-threadsteps-window" />

        <rect x="24" y="22" width="780" height="54" rx="8" className="cb-threadsteps-tabbar" />
        <rect x="24" y="62" width="780" height="14" className="cb-threadsteps-tabbar-fill" />
        <rect x="36" y="34" width="44" height="30" rx="15" className="cb-threadsteps-count-pill" />
        <text x="58" y="54" textAnchor="middle" className="cb-threadsteps-count">
          10
        </text>

        {TABS.map((tab, index) => (
          <g key={tab.label + index}>
            <rect
              x={tab.x}
              y="22"
              width={tab.w}
              height="54"
              className={index === 1 ? 'cb-threadsteps-tab cb-threadsteps-tab--active' : 'cb-threadsteps-tab'}
            />
            <text x={tab.x + 18} y="54" className="cb-threadsteps-tab-text">
              {tab.label}
            </text>
          </g>
        ))}

        <text x="718" y="54" className="cb-threadsteps-toolbar">
          + open save
        </text>

        <text x="58" y="112" className="cb-threadsteps-muted">
          - Core Concepts menu now shows: How It Works, Start Simple, Run It Longer,
        </text>
        <text x="58" y="140" className="cb-threadsteps-muted">
          - Customize Process, Extend To Your Process, Local Scaling, Cloud Scaling.
        </text>
        <text x="58" y="168" className="cb-threadsteps-muted">
          - Threads keep task history, context, checkpoints, logs, and agent activity together.
        </text>
        <text x="58" y="214" className="cb-threadsteps-response">
          Core Concepts pages were updated and the old overview page was removed.
        </text>
        <text x="58" y="240" className="cb-threadsteps-response">
          The remaining pages are reachable from the sidebar in their new order.
        </text>

        <rect x="512" y="286" width="250" height="42" rx="12" className="cb-threadsteps-user-bubble" />
        <text x="534" y="313" className="cb-threadsteps-user-text">
          can you check why still showing in menu
        </text>

        <rect x="48" y="360" width="706" height="122" rx="5" className="cb-threadsteps-agent-card" />
        <circle cx="78" cy="389" r="13" className="cb-threadsteps-avatar" />
        <text x="100" y="394" className="cb-threadsteps-agent-title">
          Agent: Act
        </text>
        <text x="720" y="394" textAnchor="end" className="cb-threadsteps-muted">
          view logs
        </text>
        <line x1="48" y1="410" x2="754" y2="410" className="cb-threadsteps-divider" />
        <circle cx="78" cy="442" r="7" className="cb-threadsteps-ok" />
        <text x="100" y="447" className="cb-threadsteps-response">
          AI Response Complete
        </text>
        <text x="238" y="447" className="cb-threadsteps-muted">
          glm-5.2
        </text>
        <text x="100" y="472" className="cb-threadsteps-muted">
          Reasoning and tool activity are recorded as the active thread step.
        </text>

        <rect x="48" y="508" width="706" height="42" rx="8" className="cb-threadsteps-composer" />
        <text x="82" y="535" className="cb-threadsteps-muted">
          Write your message here...
        </text>
        <text x="650" y="535" className="cb-threadsteps-toolbar">
          @  #  /  &  Send
        </text>

        <rect x="834" y="22" width="322" height="548" rx="8" className="cb-threadsteps-side-panel" />
        <text x="862" y="58" className="cb-threadsteps-section">
          THREAD AND STEP MODEL
        </text>
        <text x="862" y="84" className="cb-threadsteps-side-copy">
          Left stays as the chat thread.
        </text>
        <text x="862" y="100" className="cb-threadsteps-side-copy">
          This side explains runtime concepts.
        </text>
        {CHAT_LINKS.map((link) => (
          <g key={link.id}>
            <circle cx={link.fromX} cy={link.fromY} r="3" className="cb-threadsteps-link-dot" />
            <path
              d={`M ${link.fromX + 5} ${link.fromY} C 792 ${link.fromY}, 810 ${link.toY}, 846 ${link.toY}`}
              className="cb-threadsteps-wire cb-threadsteps-wire--dashed"
              markerEnd="url(#cb-threadsteps-arrow)"
            />
          </g>
        ))}
        {CONCEPTS.map((concept, index) => renderConceptCard(concept, 850, 116 + index * 86))}
      </svg>
    </div>
  );
}
