import { Map } from './components';
import './App.css';

/**
 * Main application component.
 * Renders the MapLibre map as the primary content.
 */
function App() {
  return (
    <div className="app">
      <Map />
    </div>
  );
}

export default App;
