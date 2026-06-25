import React from 'react';
import './diagrams.css';

const W = 1180;
const H = 560;

const CODE_LINES = [
  'codebolt.onMessage(async (reqMessage: FlatUserMessage) => {',
  '  const agent = createCodeboltAgent({ systemPrompt:"You are a careful coding agent. Inspect, edit, verify, and summarize." });',
  "  let nextMessage= reqMessage, testResult='fail';",
  "  while (testResult=='fail') {",
  '    const result = await agent.processMessage(nextMessage);',
  '    const testResult = testOutput(finalMessage);',
  "    nextMessage = 'The previous output failed verification: ' + testResult.feedback+ ' Fix it and try again.';",
  '  }',
  '});',
];

const CALLOUTS = [
  {
    title: 'while loop',
    description: ['Repeats the same work until', 'verification is satisfactory.'],
    y: 176,
    sourceX: 132,
    sourceY: 260,
    className: 'cb-sawl-card--feedback',
  },
  {
    title: 'processMessage',
    description: ['Runs the agent with nextMessage', 'and produces finalMessage.'],
    y: 288,
    sourceX: 360,
    sourceY: 288,
    className: 'cb-sawl-card--active',
  },
  {
    title: 'testOutput',
    description: ['Checks finalMessage and returns', 'pass or fail with feedback.'],
    y: 400,
    sourceX: 246,
    sourceY: 316,
  },
];

export default function SingleAgentWhileLoop() {
  return (
    <div className="cb-diagram cb-diagram--while-loop">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="single-agent-while-loop-title">
        <title id="single-agent-while-loop-title">
          Annotated while loop code for processMessage and testOutput
        </title>

        <defs>
          <marker id="cb-sawl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10" className="cb-sawl-arrowhead" />
          </marker>
        </defs>

        <text x="590" y="44" textAnchor="middle" className="cb-sawl-kicker">
          SINGLE AGENT LOOP
        </text>
        <text x="590" y="78" textAnchor="middle" className="cb-sawl-title">
          code path annotated from left to right
        </text>

        <rect x="38" y="112" width="744" height="370" rx="10" className="cb-sawl-code-panel" />
        <text x="66" y="142" className="cb-sawl-lane-label">
          LEFT - CODE
        </text>
        <text x="690" y="142" textAnchor="end" className="cb-sawl-lane-copy">
          onMessage + createCodeboltAgent
        </text>

        {CODE_LINES.map((line, index) => {
          const y = 178 + index * 28;
          const isLinkedLine = index === 3 || index === 4 || index === 5;
          const highlighted =
            index === 3 ? 'cb-sawl-code-line cb-sawl-code-line--while'
              : index === 4 ? 'cb-sawl-code-line cb-sawl-code-line--process'
                : index === 5 ? 'cb-sawl-code-line cb-sawl-code-line--test'
                  : 'cb-sawl-code-line';

          return (
            <g key={`${line}-${index}`}>
              {isLinkedLine && <rect x="90" y={y - 17} width="662" height="23" rx="5" className="cb-sawl-code-highlight" />}
              <text x="66" y={y} className="cb-sawl-line-number">
                {index + 1}
              </text>
              <text x="96" y={y} className={highlighted}>
                {line}
              </text>
            </g>
          );
        })}

        <rect x="826" y="112" width="316" height="370" rx="10" className="cb-sawl-lane" />
        <text x="854" y="142" className="cb-sawl-lane-label">
          RIGHT - LOOP STEPS
        </text>
        <text x="854" y="164" className="cb-sawl-lane-copy">
          Dashed links show which code line owns each step.
        </text>

        {CALLOUTS.map((callout) => {
          const cardClass = callout.className ? `cb-sawl-card ${callout.className}` : 'cb-sawl-card';
          return (
            <g key={callout.title}>
              <path
                d={`M ${callout.sourceX} ${callout.sourceY} H 840 V ${callout.y + 36} H 856`}
                className="cb-sawl-wire cb-sawl-wire--annotation"
                markerEnd="url(#cb-sawl-arrow)"
              />
              <circle cx={callout.sourceX} cy={callout.sourceY} r="4" className="cb-sawl-anchor-dot" />
              <rect x="866" y={callout.y} width="246" height="82" rx="8" className={cardClass} />
              <text x="890" y={callout.y + 28} className="cb-sawl-card-title">
                {callout.title}
              </text>
              {callout.description.map((line, index) => (
                <text key={line} x="890" y={callout.y + 52 + index * 15} className="cb-sawl-card-copy">
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        <path
          d="M 504 348 C 536 432, 242 432, 242 266"
          className="cb-sawl-wire cb-sawl-wire--fail"
          markerEnd="url(#cb-sawl-arrow)"
        />
        <text x="380" y="434" textAnchor="middle" className="cb-sawl-fail">
          fail updates nextMessage and loops
        </text>

        <text x="590" y="524" textAnchor="middle" className="cb-sawl-caption">
          processMessage produces the candidate output; testOutput decides pass or fail; fail feedback becomes nextMessage
        </text>
      </svg>
    </div>
  );
}
