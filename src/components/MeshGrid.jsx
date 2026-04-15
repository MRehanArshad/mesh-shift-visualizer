import React from 'react';

export default function MeshGrid({ p, nodes, animationState }) {
  const root = Math.sqrt(p);
  const gridSize = 100 / root; // percentage size of each cell

  // Determine which arrow to show
  let arrow = null;
  if (animationState === 'STAGE1_ANIMATING') arrow = '→';
  if (animationState === 'STAGE2_ANIMATING') arrow = '↓';

  // Generate the background sockets (the physical mesh nodes)
  const sockets = Array.from({ length: p }, (_, i) => {
    return (
      <div 
        key={`socket-${i}`} 
        className="mesh-socket"
        style={{
          width: `${gridSize}%`,
          height: `${gridSize}%`,
          top: `${Math.floor(i / root) * gridSize}%`,
          left: `${(i % root) * gridSize}%`
        }}
      >
        <span className="socket-label">Node {i}</span>
      </div>
    );
  });

  // Render the data packets that glide over the sockets
  const packets = nodes.map(node => {
    const r = Math.floor(node.currentIndex / root);
    const c = node.currentIndex % root;
    return (
      <div 
        key={node.id} 
        className="data-packet"
        style={{
          width: `${gridSize}%`,
          height: `${gridSize}%`,
          top: `${r * gridSize}%`,
          left: `${c * gridSize}%`
        }}
      >
        <div className="packet-content">
          <span className="packet-value">D{node.originalIndex}</span>
          {arrow && <span className="packet-arrow" style={{
             position: 'absolute',
             fontSize: '1.2rem',
             color: 'rgba(255, 255, 255, 0.7)',
             textShadow: '0 0 5px white',
             right: arrow === '→' ? '-10px' : 'auto',
             bottom: arrow === '↓' ? '-10px' : 'auto',
             transform: arrow === '→' ? 'none' : 'none'
          }}>{arrow}</span>}
        </div>
      </div>
    );
  });

  return (
    <div className="mesh-grid-container">
      <div className="mesh-grid-wrapper">
        {sockets}
        {packets}
      </div>
    </div>
  );
}
