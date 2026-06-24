import React from 'react';
import './diagrams.css';

/**
 * Cloud Platform Architecture
 *
 * Three cooperating components: the Cloud Portal (browser), the Wrangler
 * WebSocket Server (Cloudflare Worker + Durable Objects), and the CodeBolt
 * Runtime (local machine via the cloud plugin, or a managed sandbox).
 * The portal and runtime never talk directly — the Wrangler server relays
 * every message and persists state in KV.
 */

const W = 980;
const H = 540;

export default function CloudPlatformArchitecture() {
  return (
    <div className="cb-diagram cb-diagram--cloud">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby="cloud-platform-architecture-title">
        <title id="cloud-platform-architecture-title">
          Cloud platform architecture: the Cloud Portal connects over WebSocket to the Wrangler
          WebSocket Server, which relays messages to a CodeBolt Runtime running the cloud plugin
          on your machine or inside a managed sandbox.
        </title>

        <defs>
          <marker
            id="cb-cloud-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <polygon points="0 0, 10 5, 0 10" className="cb-cloud-arrowfill" />
          </marker>
        </defs>

        <text x="52" y="32" className="cb-cloud-eyebrow">How the Cloud Platform Fits Together</text>

        {/* ── Column 1: Cloud Portal ─────────────────────────────── */}
        <g>
          <rect x="44" y="64" width="252" height="316" rx="8" className="cb-cloud-col-rect" />
          <text x="68" y="96" className="cb-cloud-title">Cloud Portal</text>
          <text x="68" y="116" className="cb-cloud-sub">portal.codebolt.ai · browser UI</text>

          <rect x="68" y="138" width="204" height="26" rx="4" className="cb-cloud-chip-rect" />
          <text x="170" y="155" textAnchor="middle" className="cb-cloud-chip-label">Remote Chat</text>

          <rect x="68" y="170" width="204" height="26" rx="4" className="cb-cloud-chip-rect" />
          <text x="170" y="187" textAnchor="middle" className="cb-cloud-chip-label">Environments</text>

          <rect x="68" y="202" width="204" height="26" rx="4" className="cb-cloud-chip-rect" />
          <text x="170" y="219" textAnchor="middle" className="cb-cloud-chip-label">Runner Nodes</text>

          <rect x="68" y="234" width="204" height="26" rx="4" className="cb-cloud-chip-rect" />
          <text x="170" y="251" textAnchor="middle" className="cb-cloud-chip-label">Tasks · RMR · Inbox</text>

          <text x="68" y="290" className="cb-cloud-foot">Registry · Agents · Settings</text>
          <text x="68" y="306" className="cb-cloud-foot">three top-level tabs</text>
          <text x="68" y="350" className="cb-cloud-foot">you drive agents from here</text>
        </g>

        {/* ── Column 2: Wrangler WebSocket Server ────────────────── */}
        <g>
          <rect x="354" y="64" width="288" height="380" rx="8" className="cb-cloud-server-rect" />
          <text x="378" y="96" className="cb-cloud-title">Wrangler WebSocket Server</text>
          <text x="378" y="116" className="cb-cloud-sub">Cloudflare Worker + Durable Objects</text>

          <rect x="378" y="138" width="240" height="128" rx="4" className="cb-cloud-module-rect" />
          <text x="392" y="162" className="cb-cloud-chip-label">ProxyHub</text>
          <rect x="548" y="148" width="56" height="18" rx="9" className="cb-cloud-badge" />
          <text x="576" y="161" textAnchor="middle" className="cb-cloud-badge-text">DO</text>
          <text x="392" y="184" className="cb-cloud-foot">routes messages by appToken</text>
          <text x="392" y="202" className="cb-cloud-foot">buffers payloads to KV store</text>
          <text x="392" y="220" className="cb-cloud-foot">GitHub App clone + merge</text>
          <text x="392" y="238" className="cb-cloud-foot">tracks runtimes · threads · RMRs</text>

          <rect x="378" y="282" width="240" height="92" rx="4" className="cb-cloud-module-rect" />
          <text x="392" y="306" className="cb-cloud-chip-label">PreviewHub</text>
          <rect x="548" y="292" width="56" height="18" rx="9" className="cb-cloud-badge" />
          <text x="576" y="305" textAnchor="middle" className="cb-cloud-badge-text">DO</text>
          <text x="392" y="328" className="cb-cloud-foot">live preview sessions</text>
          <text x="392" y="346" className="cb-cloud-foot">static + dynamic site previews</text>

          <text x="378" y="406" className="cb-cloud-foot">CHAT_STORE KV — SQLite-backed DO storage</text>
          <text x="378" y="424" className="cb-cloud-foot">survives hibernation + restarts</text>
        </g>

        {/* ── Column 3: CodeBolt Runtime ─────────────────────────── */}
        <g>
          <rect x="700" y="64" width="236" height="316" rx="8" className="cb-cloud-runtime-rect" />
          <text x="716" y="96" className="cb-cloud-title">CodeBolt Runtime</text>
          <text x="716" y="116" className="cb-cloud-sub">the agent process</text>

          <rect x="716" y="138" width="204" height="112" rx="4" className="cb-cloud-module-rect" />
          <text x="728" y="162" className="cb-cloud-chip-label">cloud-plugin</text>
          <text x="728" y="184" className="cb-cloud-foot">registers a runtimeId</text>
          <text x="728" y="202" className="cb-cloud-foot">streams execution events</text>
          <text x="728" y="220" className="cb-cloud-foot">applies incoming commands</text>

          <rect x="716" y="268" width="204" height="60" rx="4" className="cb-cloud-sandbox-rect" />
          <text x="728" y="290" className="cb-cloud-chip-label">Managed sandbox</text>
          <text x="728" y="310" className="cb-cloud-foot">E2B · Daytona · Runloop</text>

          <text x="716" y="350" className="cb-cloud-foot">your machine</text>
          <text x="716" y="366" className="cb-cloud-foot">OR a cloud sandbox</text>
        </g>

        {/* ── Wires ──────────────────────────────────────────────── */}
        <line
          x1="296"
          y1="210"
          x2="354"
          y2="210"
          className="cb-cloud-wire cb-cloud-wire--accent"
          markerStart="url(#cb-cloud-arrow)"
          markerEnd="url(#cb-cloud-arrow)"
        />
        <circle cx="296" cy="210" r="3" className="cb-cloud-dot" />
        <circle cx="354" cy="210" r="3" className="cb-cloud-dot" />
        <text x="325" y="200" textAnchor="middle" className="cb-cloud-wire-label">wss</text>

        <line
          x1="642"
          y1="210"
          x2="700"
          y2="210"
          className="cb-cloud-wire cb-cloud-wire--accent"
          markerStart="url(#cb-cloud-arrow)"
          markerEnd="url(#cb-cloud-arrow)"
        />
        <circle cx="642" cy="210" r="3" className="cb-cloud-dot" />
        <circle cx="700" cy="210" r="3" className="cb-cloud-dot" />
        <text x="671" y="200" textAnchor="middle" className="cb-cloud-wire-label">wss</text>

        <path
          d="M 618 374 C 660 374 680 300 700 298"
          className="cb-cloud-wire"
          markerEnd="url(#cb-cloud-arrow)"
        />
        <text x="660" y="316" textAnchor="middle" className="cb-cloud-wire-label">preview</text>

        {/* ── Caption ────────────────────────────────────────────── */}
        <text x="490" y="500" textAnchor="middle" className="cb-cloud-caption">
          The portal and your runtime never talk directly — the Wrangler server relays every message
          and persists state in KV.
        </text>
        <text x="490" y="518" textAnchor="middle" className="cb-cloud-caption">
          Both connections are outbound WebSocket, so no inbound ports are opened on your machine.
        </text>
      </svg>
    </div>
  );
}
