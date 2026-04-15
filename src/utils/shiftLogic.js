export const getMeshDimensions = (p) => {
  return Math.sqrt(p);
};

export const calculateMeshSteps = (p, q) => {
  const root = getMeshDimensions(p);
  return (q % root) + Math.floor(q / root);
};

export const calculateRingSteps = (p, q) => {
  return Math.min(q, p - q);
};

export const generateInitialNodes = (p) => {
  // Returns an array of node objects
  // index is the current position, originalIndex is the data it holds
  return Array.from({ length: p }, (_, i) => ({
    id: `data-${i}`,
    originalIndex: i, // The data value
    currentIndex: i, // Where it is right now
  }));
};

export const calculateStage1 = (nodes, p, q) => {
  const root = Math.sqrt(p);
  const rowShift = q % root;
  
  return nodes.map(node => {
    const r = Math.floor(node.currentIndex / root);
    const c = node.currentIndex % root;
    const newC = (c + rowShift) % root;
    const newIndex = r * root + newC;
    
    return {
      ...node,
      currentIndex: newIndex
    };
  });
};

export const calculateStage2 = (nodes, p, q) => {
  const root = Math.sqrt(p);
  const colShift = Math.floor(q / root);
  
  return nodes.map(node => {
    const r = Math.floor(node.currentIndex / root);
    const c = node.currentIndex % root;
    const newR = (r + colShift) % root;
    const newIndex = newR * root + c;
    
    return {
      ...node,
      currentIndex: newIndex
    };
  });
};
