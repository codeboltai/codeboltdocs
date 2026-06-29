import React from 'react';
import './diagrams.css';

export default function DepositionPickupDiagram() {
  return (
    <div className="cb-diagram cb-diagram--while-loop">
      <img
        className="cb-sawl-image"
        src="/diagrams/deposition-pickup.svg"
        alt="Annotated code example showing an agent depositing a deliberation summary and test result for a later agent"
      />
    </div>
  );
}
