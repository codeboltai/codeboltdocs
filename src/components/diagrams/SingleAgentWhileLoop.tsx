import React from 'react';
import './diagrams.css';

export default function SingleAgentWhileLoop() {
  return (
    <div className="cb-diagram cb-diagram--while-loop">
   
      <img
        className="cb-sawl-image cb-sawl-image--dark"
        src="/diagrams/single-agent-loop.svg"
        alt="Annotated single agent loop showing code lines linked to while loop, processMessage, testOutput, and retry feedback"
      />
    </div>
  );
}
