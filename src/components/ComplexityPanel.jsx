import React from 'react';
import { calculateMeshSteps, calculateRingSteps, getMeshDimensions } from '../utils/shiftLogic';

export default function ComplexityPanel({ p, q }) {
  const root = getMeshDimensions(p);
  const rowShiftAmount = q % root;
  const colShiftAmount = Math.floor(q / root);
  
  const ringSteps = calculateRingSteps(p, q);
  const meshSteps = calculateMeshSteps(p, q);

  // For visual bar chart
  const maxSteps = Math.max(ringSteps, meshSteps, 1);
  const ringWidth = `${(ringSteps / maxSteps) * 100}%`;
  const meshWidth = `${(meshSteps / maxSteps) * 100}%`;

  return (
    <div className="panel complexity-panel">
      <h2>Complexity Analysis</h2>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">Row Shift Amount</span>
          <span className="metric-value">{rowShiftAmount}</span>
          <span className="metric-formula">q mod √p</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Column Shift Amount</span>
          <span className="metric-value">{colShiftAmount}</span>
          <span className="metric-formula">⌊q / √p⌋</span>
        </div>
      </div>

      <div className="comparison-section">
        <h3>Total Communication Steps</h3>
        
        <div className="chart-container">
          <div className="chart-row">
            <div className="chart-label">
              <span>Ring Topology</span>
              <span className="chart-formula">min(q, p-q) = {ringSteps}</span>
            </div>
            <div className="bar-track">
              <div className="bar ring-bar" style={{ width: ringWidth }}>
                <span className="bar-text">{ringSteps} steps</span>
              </div>
            </div>
          </div>

          <div className="chart-row">
            <div className="chart-label">
              <span>2D Mesh Topology</span>
              <span className="chart-formula">(q mod √p) + ⌊q / √p⌋ = {meshSteps}</span>
            </div>
            <div className="bar-track">
              <div className="bar mesh-bar" style={{ width: meshWidth }}>
                <span className="bar-text">{meshSteps} steps</span>
              </div>
            </div>
          </div>
        </div>

        <div className="analysis-conclusion">
          {meshSteps < ringSteps ? (
            <p className="positive">Mesh is more efficient than Ring by <strong>{ringSteps - meshSteps}</strong> steps.</p>
          ) : meshSteps > ringSteps ? (
            <p className="negative">For these values, Ring is more efficient by <strong>{meshSteps - ringSteps}</strong> steps.</p>
          ) : (
            <p className="neutral">Both topologies require the same number of steps.</p>
          )}
        </div>
      </div>
    </div>
  );
}
