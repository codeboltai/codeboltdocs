import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import './diagrams.css';

export default function AgentExtensionLoopDiagram() {
  return (
    <div className="cb-diagram cb-diagram--while-loop">
      <img
        className="cb-sawl-image"
        src={useBaseUrl('/diagrams/agent-extension-loop.svg')}
        alt="Annotated code example showing an agent extension loop with tools, processors, processMessage, inspection, and refinement"
      />
    </div>
  );
}
