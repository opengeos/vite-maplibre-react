import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type RefObject,
} from 'react';
import maplibregl, {
  type Map as MapLibreMap,
  type MapOptions,
} from 'maplibre-gl';
import { Geoman } from '@geoman-io/maplibre-geoman-free';
import { GeoEditor } from 'maplibre-gl-geo-editor';
import { LayerControl } from 'maplibre-gl-layer-control';
import { Legend } from 'maplibre-gl-components';
import { addControlGrid, DEFAULT_EXCLUDE_LAYERS } from 'maplibre-gl-components';

import { countriesGeoJSON } from '../data/countries';
import {
  BASE_MAP_STYLE,
  MAP_INITIAL_STATE,
  GEO_EDITOR_CONFIG,
  LAYER_CONTROL_CONFIG,
  LEGEND_CONFIG,
} from '../config/mapConfig';

interface UseMapLibreOptions {
  container: RefObject<HTMLDivElement | null>;
}

interface UseMapLibreReturn {
  map: MapLibreMap | null;
  isLoaded: boolean;
}

/**
 * Custom hook to initialize and manage a MapLibre GL map instance.
 * Handles all imperative MapLibre operations within React's lifecycle.
 *
 * @param options - Configuration options including container ref.
 * @returns Object containing map instance and loading state.
 */
export function useMapLibre({
  container,
}: UseMapLibreOptions): UseMapLibreReturn {
  const mapRef = useRef<MapLibreMap | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Sets up the map layers after the map style loads.
   *
   * @param map - The MapLibre map instance.
   */
  const setupLayers = useCallback((map: MapLibreMap) => {
    const style = map.getStyle();
    if (!style || !style.layers) return;

    // Add Google Satellite basemap
    map.addSource('google-satellite', {
      type: 'raster',
      tiles: ['https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'],
      tileSize: 256,
      attribution: '&copy; Google',
    });

    map.addLayer({
      id: 'Satellite',
      type: 'raster',
      source: 'google-satellite',
      minzoom: 14,
      paint: { 'raster-opacity': 1 },
      layout: { visibility: 'visible' },
    });

    // Add GeoJSON source
    map.addSource('countries-source', {
      type: 'geojson',
      data: countriesGeoJSON,
    });

    // Add fill layer
    map.addLayer({
      id: 'countries-layer',
      type: 'fill',
      source: 'countries-source',
      paint: {
        'fill-color': '#088',
        'fill-opacity': 0.5,
      },
    });

    // Add outline layer
    map.addLayer({
      id: 'countries-outline',
      type: 'line',
      source: 'countries-source',
      paint: {
        'line-color': '#000',
        'line-width': 2,
        'line-opacity': 1.0,
      },
    });

    // Add circle layer (points at country centers)
    map.addLayer({
      id: 'country-points',
      type: 'circle',
      source: 'countries-source',
      paint: {
        'circle-radius': 8,
        'circle-color': '#ef4444',
        'circle-opacity': 0.8,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-opacity': 1,
      },
    });

    // Add OpenStreetMap raster layer
    map.addSource('raster-source', {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap contributors',
    });

    map.addLayer(
      {
        id: 'OpenStreetMap',
        type: 'raster',
        source: 'raster-source',
        paint: { 'raster-opacity': 1.0 },
        layout: { visibility: 'none' },
      },
      'countries-layer'
    );
  }, []);

  /**
   * Sets up map controls (layer control, legend).
   *
   * @param map - The MapLibre map instance.
   */
  const setupControls = useCallback((map: MapLibreMap) => {
    // Create the layer control
    const layerControl = new LayerControl({
      ...LAYER_CONTROL_CONFIG,
      basemapStyleUrl: BASE_MAP_STYLE,
    });
    map.addControl(layerControl, 'top-right');

    // Add legend
    const shapeLegend = new Legend(LEGEND_CONFIG);
    map.addControl(shapeLegend, 'bottom-left');
  }, []);

  /**
   * Sets up Geoman and GeoEditor controls.
   *
   * @param map - The MapLibre map instance.
   */
  const setupGeoman = useCallback((map: MapLibreMap) => {
    const geoman = new Geoman(map, {});

    map.on('gm:loaded', () => {
      const geoEditor = new GeoEditor({
        ...GEO_EDITOR_CONFIG,
        onFeatureCreate: (feature: unknown) => console.log('Created:', feature),
        onSelectionChange: (features: unknown[]) =>
          console.log('Selected:', features.length),
      });

      geoEditor.setGeoman(geoman);
      map.addControl(geoEditor, 'top-left');
    });
  }, []);

  useEffect(() => {
    // Guard: Don't initialize if container is not available
    if (!container.current) return;

    // Guard: Don't re-initialize if map already exists
    if (mapRef.current) return;

    // Create map instance
    const mapOptions: MapOptions = {
      container: container.current,
      style: BASE_MAP_STYLE,
      center: MAP_INITIAL_STATE.center,
      zoom: MAP_INITIAL_STATE.zoom,
    };

    const map = new maplibregl.Map(mapOptions);
    mapRef.current = map;

    // // Add navigation controls
    // map.addControl(new maplibregl.NavigationControl(), 'top-right');
    // map.addControl(new maplibregl.FullscreenControl(), 'top-right');
    // map.addControl(new maplibregl.GlobeControl(), 'top-right');

    // // Handle map load event
    map.on('load', () => {
      setupLayers(map);
      // setupControls(map);
      // setupGeoman(map);
      setIsLoaded(true);
    });

    // Cleanup function


    // Add layer control
    const layerControl = new LayerControl({
      collapsed: true,
      layers: [],
      panelWidth: 340,
      panelMinWidth: 240,
      panelMaxWidth: 450,
      basemapStyleUrl: BASE_MAP_STYLE,
      excludeLayers: [...DEFAULT_EXCLUDE_LAYERS],
    });

    map.addControl(layerControl, 'top-right');

    // Add a ControlGrid with all default controls in one call
    const controlGrid = addControlGrid(map, { basemapStyleUrl: BASE_MAP_STYLE });

    // Register data-layer adapters so COG, Zarr, PMTiles layers appear in the LayerControl
    for (const adapter of controlGrid.getAdapters()) {
      layerControl.registerCustomAdapter(adapter);
    }


    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setIsLoaded(false);
      }
    };
  }, [container, setupLayers, setupControls, setupGeoman]);

  return {
    map: mapRef.current,
    isLoaded,
  };
}
