import React from 'react';
import './diagrams.css';

export default function AgentExtensionLoopDiagram() {
  return (
    <div className="cb-diagram cb-diagram--while-loop">
      <img
        className="cb-sawl-image"
        src="/diagrams/agent-extension-loop.svg"
        alt="Annotated code example showing an agent extension loop with tools, processors, processMessage, inspection, and refinement"
      />
    </div>
  );
}
