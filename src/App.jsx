import React, { useState, useEffect } from 'react';
import ControlPanel from './components/ControlPanel';
import ComplexityPanel from './components/ComplexityPanel';
import MeshGrid from './components/MeshGrid';
import { generateInitialNodes, calculateStage1, calculateStage2 } from './utils/shiftLogic';
import './index.css';

function App() {
  const [p, setP] = useState(16);
  const [q, setQ] = useState(5);
  const [nodes, setNodes] = useState([]);
  const [animationState, setAnimationState] = useState('IDLE');

  useEffect(() => {
    resetSimulation();
  }, [p, q]);

  const resetSimulation = () => {
    setNodes(generateInitialNodes(p));
    setAnimationState('IDLE');
  };

  const triggerNext = () => {
    if (animationState === 'IDLE') {
      setAnimationState('STAGE1_ANIMATING');
      setNodes(calculateStage1(nodes, p, q));
      // Give css transition time to finish
      setTimeout(() => {
        setAnimationState('STAGE1_DONE');
      }, 1200); 
    } else if (animationState === 'STAGE1_DONE') {
      setAnimationState('STAGE2_ANIMATING');
      setNodes(calculateStage2(nodes, p, q));
      setTimeout(() => {
        setAnimationState('STAGE2_DONE');
      }, 1200);
    }
  };

  return (
    <div className="app-container">
      <div className="bg-glow"></div>
      <header className="app-header">
        <h1>Mesh Circular Shift <span className="highlight">Visualizer</span></h1>
        <p>Parallel Computing • 2D Mesh Topology Routing</p>
      </header>
      
      <main className="app-content">
        <aside className="sidebar">
          <ControlPanel 
            p={p} 
            setP={setP} 
            q={q} 
            setQ={setQ} 
            animationState={animationState}
            triggerNext={triggerNext}
            resetSimulation={resetSimulation}
          />
          <ComplexityPanel p={p} q={q} />
        </aside>
        
        <section className="visualization-area">
          <MeshGrid p={p} nodes={nodes} animationState={animationState} />
        </section>
      </main>
    </div>
  );
}

export default App;
