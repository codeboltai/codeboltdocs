import React from 'react';
import './diagrams.css';

/**
 * Codebolt Web App Architecture - based on canvas/canvas_1782280055788_3d6bm7.canvas.
 * Web and CLI enter Codebolt; plugins and agents communicate bidirectionally.
 */

const NODES = {
  web: { x: 230, y: 36, w: 150, h: 66, title: 'WEB', sub: 'app interface' },
  cli: { x: 430, y: 36, w: 116, h: 66, title: 'CLI', sub: 'terminal' },
  codebolt: { x: 238, y: 184, w: 244, h: 122, title: 'CODEBOLT', sub: 'threads · runtime · tools' },
  agent: { x: 564, y: 218, w: 116, h: 66, title: 'AGENT', sub: 'worker' },
  plugin: { x: 40, y: 228, w: 128, h: 58, title: 'PLUGIN', sub: 'extension' },
};

export default function CodeboltWebAppArchitecture() {
  const W = 720;
  const H = 360;

  const renderNode = (key: keyof typeof NODES, accent = false) => {
    const node = NODES[key];
    return (
      <g className="cb-webarch-node">
        <rect
          x={node.x}
          y={node.y}
          width={node.w}
          height={node.h}
          rx="3"
          className={accent ? 'cb-webarch-rect cb-webarch-rect--accent' : 'cb-webarch-rect'}
        />
        <text x={node.x + node.w / 2} y={node.y + node.h / 2 - 4} textAnchor="middle" className="cb-webarch-name">
          {node.title}
        </text>
        <text x={node.x + node.w / 2} y={node.y + node.h / 2 + 14} textAnchor="middle" className="cb-webarch-sub">
          {node.sub}
        </text>
      </g>
    );
  };

  return (
    <div className="cb-diagram cb-diagram--webapp-architecture">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="webapp-architecture-title">
        <title id="webapp-architecture-title">
          Codebolt web app architecture: web, CLI, plugin, Codebolt, and agent
        </title>

        <defs>
          <marker
            id="cb-webapp-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10" className="cb-webarch-arrowhead" />
          </marker>
        </defs>

        {renderNode('web')}
        {renderNode('cli')}
        {renderNode('codebolt', true)}
        {renderNode('agent')}
        {renderNode('plugin')}

        <line x1="305" y1="102" x2="305" y2="184" className="cb-webarch-wire" markerEnd="url(#cb-webapp-arrow)" />
        <path
          d="M 488 102 C 488 136 455 158 420 184"
          className="cb-webarch-wire"
          fill="none"
          markerEnd="url(#cb-webapp-arrow)"
        />
        <path
          d="M 168 254 C 196 250 216 238 238 226"
          className="cb-webarch-wire"
          fill="none"
          markerStart="url(#cb-webapp-arrow)"
          markerEnd="url(#cb-webapp-arrow)"
        />
        <path
          d="M 482 250 C 510 248 536 248 564 250"
          className="cb-webarch-wire"
          fill="none"
          markerStart="url(#cb-webapp-arrow)"
          markerEnd="url(#cb-webapp-arrow)"
        />
      </svg>
    </div>
  );
}
