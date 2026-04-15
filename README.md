# Mesh Circular Shift Visualizer

A full-stack interactive web application that simulates and visualizes the parallel computing circular q-shift operation on a 2D mesh topology.

## 🚀 Live Deployment
**Live URL:** [https://mesh-shift-visualizer-alpha.vercel.app/](https://mesh-shift-visualizer-alpha.vercel.app/)

## 📖 Background & Problem Statement
In parallel computing, a circular q-shift is a fundamental permutation operation where node `i` transfers its data to node `(i + q) mod p`. On a 2D mesh topology, this algorithm is executed efficiently in two distinct phases:
1. **Stage 1 (Row Shift):** Each node shifts within its row by `(q mod √p)` positions sequentially.
2. **Stage 2 (Column Shift):** Each node shifts within its column by `⌊q / √p⌋` positions sequentially.

## 🛠 Features
- **Dynamic 2D Mesh Rendering:** Simulates shifting mechanics visually for any valid perfect square node size `p` (4 to 64).
- **Responsive Control Panel:** Select step bounds for `p` and `q`.
- **Intelligent Step-by-Step Animation:** Watch packets glide across grid sockets using native CSS transitions mapped with directional arrows.
- **Mathematical Complexity Panel:** Highlights Ring Topology steps vs 2D Mesh Topology steps dynamically to visualize operational comparisons. Bar chart tracks logic live as you manipulate variables.

## ⚙️ Installation & Setup Instructions

To run this application locally on your machine, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16.0.0 or higher)
- npm packaged manager

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/MRehanArshad/mesh-shift-visualizer.git
   cd mesh-shift-visualizer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **View in Browser:**
   Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

## 🏗 Tech Stack
- **Frontend Framework:** React.js (Bootstrapped with Vite)
- **Styling:** Vanilla CSS with Custom Variables (CSS Modern Dark/Neon Theme & Glassmorphism semantics)
- **Animations:** CSS percentage-based positional calculations dynamically mapped from the 2D mesh logic algorithms.

---
*Created for PDC Assignment Q4: Mesh Circular Shift Visualizer.*
