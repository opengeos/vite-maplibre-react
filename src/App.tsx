import { useState, useCallback } from 'react';
import { Map, Sidebar } from './components';
import './App.css';

/**
 * Main application component.
 * Renders the MapLibre map with a sidebar.
 */
function App() {
  const [mapCenter, setMapCenter] = useState<[number, number]>();
  const [mapZoom, setMapZoom] = useState<number>();

  const handleMapMove = useCallback((center: [number, number], zoom: number) => {
    setMapCenter(center);
    setMapZoom(zoom);
  }, []);

  return (
    <div className="app">
      <Sidebar mapCenter={mapCenter} mapZoom={mapZoom} />
      <main className="main-content">
        <Map onMove={handleMapMove} />
      </main>
    </div>
  );
}

export default App;
