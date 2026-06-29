import React from 'react';
import './diagrams.css';

export default function DepositionPickupDiagram() {
  return (
    <div className="cb-diagram cb-diagram--while-loop">
      <img
        className="cb-sawl-image"
        src="/diagrams/deposition-pickup.svg"
        alt="Flow diagram showing an agent producing a result, choosing a deposition surface, depositing evidence through Codebolt APIs, and a later agent loading the result by ID"
      />
    </div>
  );
}
