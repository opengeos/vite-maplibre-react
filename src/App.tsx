import { Map, Sidebar } from './components';
import './App.css';

/**
 * Main application component.
 * Renders the MapLibre map with a sidebar.
 */
function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Map />
      </main>
    </div>
  );
}

export default App;
