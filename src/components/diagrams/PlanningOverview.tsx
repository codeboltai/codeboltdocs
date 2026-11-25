import React from 'react';
import './diagrams.css';

const W = 860;
const H = 500;

export default function PlanningOverview() {
  return (
    <div className="cb-diagram cb-diagram--planning">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="planning-overview-title">
        <title id="planning-overview-title">
          Planning overview: a feature plan links notes, canvases and execution plans alongside the project roadmap and tasks
        </title>

        <defs>
          <marker
            id="cb-plan-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <polygon points="0 0, 10 5, 0 10" className="cb-plan-arrowfill" />
          </marker>
        </defs>

        <text x="70" y="24" className="cb-plan-eyebrow">How The Planning Tools Compose</text>

        <rect x="64" y="52" width="220" height="108" rx="6" className="cb-plan-strategy-rect" />
        <text x="88" y="78" className="cb-plan-title">Roadmap</text>
        <text x="88" y="98" className="cb-plan-sub">
          Product intent: phases, features, and ideation.
        </text>
        <rect x="92" y="116" width="76" height="28" rx="4" className="cb-plan-chip-rect" />
        <text x="130" y="134" textAnchor="middle" className="cb-plan-chip-label">phases</text>
        <rect x="178" y="116" width="82" height="28" rx="4" className="cb-plan-chip-rect" />
        <text x="219" y="134" textAnchor="middle" className="cb-plan-chip-label">features</text>

        <rect x="326" y="52" width="208" height="108" rx="6" className="cb-plan-doc-rect" />
        <text x="350" y="78" className="cb-plan-title">Notes</text>
        <text x="350" y="98" className="cb-plan-sub">
          Technical behavior, constraints, and design detail.
        </text>
        <text x="350" y="126" className="cb-plan-foot">written in a project note</text>

        <rect x="576" y="52" width="220" height="108" rx="6" className="cb-plan-design-rect" />
        <text x="600" y="78" className="cb-plan-title">Canvas</text>
        <text x="600" y="98" className="cb-plan-sub">
          Screens, wireframes, and interaction sketches.
        </text>
        <text x="600" y="126" className="cb-plan-foot">freehand canvas stored in project</text>

        <rect x="254" y="210" width="352" height="92" rx="6" className="cb-plan-aggregate-rect" />
        <text x="430" y="236" textAnchor="middle" className="cb-plan-aggregate-title">
          Feature Plan
        </text>
        <text x="430" y="256" textAnchor="middle" className="cb-plan-sub">
          One aggregation document that embeds linked planning artifacts.
        </text>
        <rect x="290" y="270" width="88" height="22" rx="4" className="cb-plan-chip-rect" />
        <text x="334" y="285" textAnchor="middle" className="cb-plan-chip-label">note links</text>
        <rect x="386" y="270" width="88" height="22" rx="4" className="cb-plan-chip-rect" />
        <text x="430" y="285" textAnchor="middle" className="cb-plan-chip-label">canvas links</text>
        <rect x="482" y="270" width="88" height="22" rx="4" className="cb-plan-chip-rect" />
        <text x="526" y="285" textAnchor="middle" className="cb-plan-chip-label">plan links</text>

        <path d="M 430 160 L 430 210" className="cb-plan-wire" markerEnd="url(#cb-plan-arrow)" />
        <path d="M 686 160 L 686 182 L 520 182 L 520 210" className="cb-plan-wire" markerEnd="url(#cb-plan-arrow)" />
        <path d="M 430 160 L 430 182 L 340 182 L 340 210" className="cb-plan-wire" markerEnd="url(#cb-plan-arrow)" />
        <text x="468" y="176" className="cb-plan-wire-label">links artifacts into one planning document</text>

        <rect x="316" y="354" width="228" height="90" rx="6" className="cb-plan-exec-rect" />
        <text x="340" y="380" className="cb-plan-title">Execution Plan</text>
        <text x="340" y="400" className="cb-plan-sub">
          Implementation steps and dependencies.
        </text>
        <text x="340" y="426" className="cb-plan-foot">
          track progress across steps
        </text>

        <path d="M 430 302 L 430 354" className="cb-plan-wire cb-plan-wire--accent" markerEnd="url(#cb-plan-arrow)" />
        <text x="446" y="332" className="cb-plan-wire-label">how it gets built</text>

        <rect x="72" y="354" width="186" height="90" rx="6" className="cb-plan-ops-rect" />
        <text x="96" y="380" className="cb-plan-title">Tasks</text>
        <text x="96" y="400" className="cb-plan-sub">
          Individual work items, status, priority, subtasks, and messages.
        </text>
        <text x="96" y="426" className="cb-plan-foot">
          backlog and live work tracking
        </text>

        <path d="M 284 106 L 284 332 L 165 332 L 165 354" className="cb-plan-wire" markerEnd="url(#cb-plan-arrow)" />
        <text x="98" y="326" className="cb-plan-wire-label">convert roadmap features into tasks</text>

        <path d="M 316 399 L 258 399" className="cb-plan-wire cb-plan-wire--accent" markerEnd="url(#cb-plan-arrow)" />
        <text x="260" y="389" textAnchor="middle" className="cb-plan-wire-label">execution breaks down into tasks</text>

        <text x="430" y="476" textAnchor="middle" className="cb-plan-caption">
          Use one artifact on its own, or combine them into a planning stack that stays readable by both people and agents.
        </text>
      </svg>
    </div>
  );
}
