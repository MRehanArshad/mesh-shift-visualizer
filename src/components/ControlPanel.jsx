import React, { useState } from 'react';

const isPerfectSquare = (n) => {
  return Number.isInteger(Math.sqrt(n));
};

export default function ControlPanel({ p, setP, q, setQ, animationState, triggerNext, resetSimulation }) {
  const [tempP, setTempP] = useState(p);
  const [tempQ, setTempQ] = useState(q);
  const [error, setError] = useState('');

  const handleApply = () => {
    const numP = parseInt(tempP, 10);
    const numQ = parseInt(tempQ, 10);

    if (isNaN(numP) || numP < 4 || numP > 64) {
      setError('p must be between 4 and 64.');
      return;
    }
    if (!isPerfectSquare(numP)) {
      setError('p must be a perfect square (4, 9, 16, 25, 36, 49, 64).');
      return;
    }
    if (isNaN(numQ) || numQ < 1 || numQ >= numP) {
      setError(`q must be between 1 and ${numP - 1}.`);
      return;
    }

    setError('');
    setP(numP);
    setQ(numQ);
  };

  const getButtonText = () => {
    switch (animationState) {
      case 'IDLE': return 'Start Stage 1 (Row Shift)';
      case 'STAGE1_DONE': return 'Start Stage 2 (Col Shift)';
      case 'STAGE2_DONE': return 'Finished';
      default: return 'Animating...';
    }
  };

  const isAnimating = animationState === 'STAGE1_ANIMATING' || animationState === 'STAGE2_ANIMATING';
  const isFinished = animationState === 'STAGE2_DONE';

  return (
    <div className="panel control-panel">
      <h2>Simulation Controls</h2>
      
      <div className="input-group">
        <label>Number of Nodes (p):</label>
        <input 
          type="number" 
          value={tempP} 
          onChange={(e) => setTempP(e.target.value)} 
          disabled={animationState !== 'IDLE'}
          min="4"
          max="64"
        />
        <small>Perfect square from 4 to 64</small>
      </div>

      <div className="input-group">
        <label>Shift Amount (q):</label>
        <input 
          type="number" 
          value={tempQ} 
          onChange={(e) => setTempQ(e.target.value)} 
          disabled={animationState !== 'IDLE'}
          min="1"
          max={tempP - 1}
        />
        <small>From 1 to p-1</small>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div className="button-group">
        <button 
          className="btn-apply" 
          onClick={handleApply}
          disabled={animationState !== 'IDLE' || tempP == p && tempQ == q}
        >
          Apply Parameters
        </button>
        <button 
          className="btn-reset" 
          onClick={resetSimulation}
        >
          Reset Simulation
        </button>
      </div>

      <div className="action-group">
        <button 
          className={`btn-action ${isFinished ? 'finished' : ''}`}
          onClick={triggerNext}
          disabled={isAnimating || isFinished || p != tempP || q != tempQ}
        >
          {getButtonText()}
        </button>
      </div>

      <div className="status-indicator">
        <strong>Current State: </strong> 
        <span className={`status-badge ${animationState.toLowerCase()}`}>
          {animationState.replace('_', ' ')}
        </span>
      </div>
    </div>
  );
}
