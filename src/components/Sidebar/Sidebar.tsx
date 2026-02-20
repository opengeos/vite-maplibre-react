import { useState } from 'react';
import './Sidebar.css';

interface SidebarProps {
  mapCenter?: [number, number];
  mapZoom?: number;
}

/**
 * Sidebar component displaying map information and layer panels.
 */
export function Sidebar({ mapCenter, mapZoom }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'layers' | 'data'>('info');

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <h1>MapLibre React</h1>
      </header>

      <nav className="sidebar-tabs">
        <button
          className={`tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Info
        </button>
        <button
          className={`tab ${activeTab === 'layers' ? 'active' : ''}`}
          onClick={() => setActiveTab('layers')}
        >
          Layers
        </button>
        <button
          className={`tab ${activeTab === 'data' ? 'active' : ''}`}
          onClick={() => setActiveTab('data')}
        >
          Data
        </button>
      </nav>

      <div className="sidebar-content">
        {activeTab === 'info' && (
          <div className="panel">
            <h2>Map Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Center</span>
                <span className="info-value">
                  {mapCenter
                    ? `${mapCenter[1].toFixed(4)}, ${mapCenter[0].toFixed(4)}`
                    : 'Loading...'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Zoom</span>
                <span className="info-value">
                  {mapZoom !== undefined ? mapZoom.toFixed(2) : 'Loading...'}
                </span>
              </div>
            </div>

            <h3>About</h3>
            <p className="about-text">
              This application demonstrates MapLibre GL JS with React, featuring
              vector tiles, GeoJSON layers, and interactive controls.
            </p>

            <h3>Features</h3>
            <ul className="feature-list">
              <li>Vector tile basemaps</li>
              <li>GeoJSON layer support</li>
              <li>Drawing tools (Geoman)</li>
              <li>Layer control panel</li>
              <li>Multiple basemap styles</li>
            </ul>
          </div>
        )}

        {activeTab === 'layers' && (
          <div className="panel">
            <h2>Available Layers</h2>
            <p className="hint-text">
              Use the layer control on the map to toggle layers.
            </p>

            <div className="layer-list">
              <div className="layer-item">
                <span className="layer-icon" style={{ background: '#3388ff' }} />
                <span className="layer-name">Countries</span>
              </div>
              <div className="layer-item">
                <span className="layer-icon" style={{ background: '#ff7800' }} />
                <span className="layer-name">Points of Interest</span>
              </div>
              <div className="layer-item">
                <span className="layer-icon" style={{ background: '#00a651' }} />
                <span className="layer-name">Custom GeoJSON</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="panel">
            <h2>Data Sources</h2>
            <div className="data-source">
              <h4>OpenMapTiles</h4>
              <p>Vector tiles for base map styling</p>
            </div>
            <div className="data-source">
              <h4>Natural Earth</h4>
              <p>Country boundaries and geographic features</p>
            </div>
            <div className="data-source">
              <h4>Custom Data</h4>
              <p>Upload your own GeoJSON, Shapefile, or PMTiles</p>
            </div>
          </div>
        )}
      </div>

      <footer className="sidebar-footer">
        <a
          href="https://github.com/opengeos/vite-maplibre-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository
        </a>
      </footer>
    </aside>
  );
}
