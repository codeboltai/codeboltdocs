import React from 'react';
import './diagrams.css';

/**
 * SingleAgentLoop - the act-updated single agent loop.
 *
 * Mirrors the reference "loop engineering" diagram: the user hands off a goal,
 * context, and verification signal, then the agent owns an act/check/correct
 * loop until it can return a final result.
 */

const W = 860;
const H = 660;

export default function SingleAgentLoop() {
  return (
    <div className="cb-diagram cb-diagram--single-loop">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="single-loop-title">
        <title id="single-loop-title">
          Single agent loop: hand off a goal and verification signal, then let the agent act, check, and correct until done
        </title>

        <defs>
          <marker id="cb-sal-arr" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
            <polygon points="0 0, 8 3.5, 0 7" fill="#56685b" />
          </marker>
          <marker id="cb-sal-arr-muted" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
            <polygon points="0 0, 8 3.5, 0 7" fill="#8a8f88" />
          </marker>
        </defs>

        <text x="430" y="44" textAnchor="middle" className="cb-sal-kicker">
          CODEBOLT ACT - HOW THE LOOP WORKS
        </text>
        <text x="430" y="82" textAnchor="middle" className="cb-sal-hero">
          Single agent loop
        </text>
        <text x="430" y="108" textAnchor="middle" className="cb-sal-subtitle">
          You give the goal, context, and verification target. The agent runs the loop until the work passes.
        </text>

        <rect x="150" y="150" width="560" height="76" rx="8" className="cb-sal-input" />
        <text x="430" y="172" textAnchor="middle" className="cb-sal-kicker">
          USER - INPUT ONCE, THEN HAND OFF
        </text>
        <text x="430" y="196" textAnchor="middle" className="cb-sal-card-title">
          Goal + context + how to verify
        </text>
        <text x="430" y="216" textAnchor="middle" className="cb-sal-card-sub">
          chat history / project context / IDE state / tools / @file refs
        </text>

        <line x1="430" y1="226" x2="430" y2="284" className="cb-sal-arrow-muted" markerEnd="url(#cb-sal-arr-muted)" />

        <circle cx="430" cy="430" r="205" className="cb-sal-ring" />

        <rect x="352" y="282" width="156" height="72" rx="6" className="cb-sal-node" />
        <text x="430" y="304" textAnchor="middle" className="cb-sal-node-kicker">
          AGENT 1 - ACT
        </text>
        <text x="430" y="328" textAnchor="middle" className="cb-sal-node-title">
          Act
        </text>
        <text x="430" y="348" textAnchor="middle" className="cb-sal-node-sub">
          reason and make the change
        </text>

        <rect x="498" y="505" width="166" height="72" rx="6" className="cb-sal-node" />
        <text x="581" y="527" textAnchor="middle" className="cb-sal-node-kicker">
          AGENT 2 - CHECK
        </text>
        <text x="581" y="551" textAnchor="middle" className="cb-sal-node-title">
          Check
        </text>
        <text x="581" y="571" textAnchor="middle" className="cb-sal-node-sub">
          run tools and verification
        </text>

        <rect x="196" y="505" width="176" height="72" rx="6" className="cb-sal-node" />
        <text x="284" y="527" textAnchor="middle" className="cb-sal-node-kicker">
          AGENT 3 - CORRECT
        </text>
        <text x="284" y="551" textAnchor="middle" className="cb-sal-node-title">
          Correct or reset
        </text>
        <text x="284" y="571" textAnchor="middle" className="cb-sal-node-sub">
          feed results into the next turn
        </text>

        <path
          d="M 520 340 C 594 380, 619 448, 595 499"
          fill="none"
          className="cb-sal-loop-arrow"
          markerEnd="url(#cb-sal-arr)"
        />
        <path
          d="M 480 568 C 412 619, 337 617, 292 584"
          fill="none"
          className="cb-sal-loop-arrow"
          markerEnd="url(#cb-sal-arr)"
        />
        <path
          d="M 250 500 C 220 430, 255 360, 346 326"
          fill="none"
          className="cb-sal-loop-arrow"
          markerEnd="url(#cb-sal-arr)"
        />

        <text x="430" y="604" textAnchor="middle" className="cb-sal-fail-label">
          fail - fix
        </text>

        <rect x="374" y="424" width="112" height="24" rx="12" className="cb-sal-badge" />
        <text x="430" y="440" textAnchor="middle" className="cb-sal-badge-text">
          AGENT-OWNED
        </text>
        <text x="430" y="474" textAnchor="middle" className="cb-sal-center-title">
          the loop
        </text>
        <text x="430" y="497" textAnchor="middle" className="cb-sal-center-sub">
          runs until checks pass
        </text>
        <text x="430" y="520" textAnchor="middle" className="cb-sal-center-sub">
          guarded by loop detection + maxTurns 30
        </text>

        <line x1="664" y1="541" x2="744" y2="541" className="cb-sal-loop-arrow" markerEnd="url(#cb-sal-arr)" />
        <text x="696" y="529" textAnchor="middle" className="cb-sal-pass-label">
          pass
        </text>
        <rect x="748" y="514" width="88" height="54" rx="27" className="cb-sal-done" />
        <text x="792" y="537" textAnchor="middle" className="cb-sal-done-title">
          Done
        </text>
        <text x="792" y="555" textAnchor="middle" className="cb-sal-done-sub">
          return result
        </text>

        <text x="430" y="632" textAnchor="middle" className="cb-sal-caption">
          Prompt engineering tunes the input. Loop engineering hands the whole cycle to the agent.
        </text>
      </svg>
    </div>
  );
}
