import React from 'react';
import './diagrams.css';

export default function MultiEnvironmentLoopDiagram() {
  return (
    <div className="cb-diagram cb-diagram--while-loop">
      <img
        className="cb-sawl-image"
        src="/diagrams/multi-environment-loop.svg"
        alt="Annotated code example showing a parent thread starting validation in an e2b sandbox remote environment"
      />
    </div>
  );
}
