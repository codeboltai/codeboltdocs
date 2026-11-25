import React from 'react';
import './diagrams.css';

/**
 * MCP Topology — agent → tool runtime → built-in tools + N MCP servers.
 * Sandboxed boundaries shown with dashed lines.
 */

export default function McpTopology() {
  const W = 680;
  const H = 320;

  return (
    <div className="cb-diagram cb-diagram--mcp">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="mcp-topology-title">
        <title id="mcp-topology-title">How tools reach the agent through MCP</title>

        {/* Agent box */}
        <g>
          <rect x="40" y="120" width="140" height="80" rx="3" className="cb-box" />
          <text x="110" y="150" textAnchor="middle" className="cb-box-title">AGENT</text>
          <text x="110" y="170" textAnchor="middle" className="cb-box-sub">deliberation loop</text>
          <text x="110" y="186" textAnchor="middle" className="cb-box-sub">allowedTools</text>
        </g>

        {/* Arrow agent → runtime */}
        <line x1="180" y1="160" x2="240" y2="160" className="cb-arrow" />
        <path d="M 232 156 L 240 160 L 232 164" className="cb-arrowhead" />

        {/* Tool runtime */}
        <g>
          <rect x="240" y="120" width="140" height="80" rx="3" className="cb-box cb-box--accent" />
          <text x="310" y="150" textAnchor="middle" className="cb-box-title">TOOL RUNTIME</text>
          <text x="310" y="170" textAnchor="middle" className="cb-box-sub">routes + sandboxes</text>
          <text x="310" y="186" textAnchor="middle" className="cb-box-sub">guardrails before exec</text>
        </g>

        {/* Fan-out lines */}
        <line x1="380" y1="140" x2="500" y2="60" className="cb-arrow" />
        <line x1="380" y1="160" x2="500" y2="160" className="cb-arrow" />
        <line x1="380" y1="180" x2="500" y2="260" className="cb-arrow" />

        {/* Sandbox dashed boundary around right column */}
        <rect x="495" y="20" width="160" height="280" rx="4" className="cb-sandbox" />
        <text x="575" y="14" textAnchor="middle" className="cb-sandbox-label">SANDBOXED PROCESSES</text>

        {/* Built-in */}
        <g>
          <rect x="500" y="40" width="150" height="46" rx="3" className="cb-box" />
          <text x="575" y="60" textAnchor="middle" className="cb-box-title">BUILT-IN</text>
          <text x="575" y="76" textAnchor="middle" className="cb-box-sub">codebolt_fs · git · ...</text>
        </g>

        {/* MCP A */}
        <g>
          <rect x="500" y="138" width="150" height="46" rx="3" className="cb-box" />
          <text x="575" y="158" textAnchor="middle" className="cb-box-title">MCP SERVER A</text>
          <text x="575" y="174" textAnchor="middle" className="cb-box-sub">github · slack · ...</text>
        </g>

        {/* MCP B */}
        <g>
          <rect x="500" y="236" width="150" height="46" rx="3" className="cb-box" />
          <text x="575" y="256" textAnchor="middle" className="cb-box-title">MCP SERVER B</text>
          <text x="575" y="272" textAnchor="middle" className="cb-box-sub">your custom tools</text>
        </g>
      </svg>
    </div>
  );
}
