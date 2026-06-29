import React from 'react';
import './diagrams.css';

export default function MultiAgentSpawnLoopDiagram() {
  return (
    <div className="cb-diagram cb-diagram--while-loop">
      <img
        className="cb-sawl-image"
        src="/diagrams/multiagent-spawn-loop.svg"
        alt="Annotated code example showing a coordinator agent spawning child agents and collecting their results"
      />
    </div>
  );
}
