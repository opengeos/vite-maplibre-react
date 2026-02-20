import { useRef } from 'react';
import { useMapLibre } from '../../hooks';
import './Map.css';

// Import MapLibre and plugin styles
import 'maplibre-gl/dist/maplibre-gl.css';
import '@geoman-io/maplibre-geoman-free/dist/maplibre-geoman.css';
import 'maplibre-gl-geo-editor/style.css';
import 'maplibre-gl-layer-control/style.css';
import 'maplibre-gl-components/style.css';

interface MapProps {
  onMove?: (center: [number, number], zoom: number) => void;
}

/**
 * Map component that renders a MapLibre GL map with controls and layers.
 * Uses the useMapLibre hook to manage the imperative MapLibre API.
 */
function Map({ onMove }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize map using custom hook
  useMapLibre({ container: containerRef, onMove });

  return <div ref={containerRef} className="map-container" />;
}

export default Map;
