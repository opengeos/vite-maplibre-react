import type { DrawMode, EditMode } from 'maplibre-gl-geo-editor';

export const BASE_MAP_STYLE =
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

export const MAP_INITIAL_STATE = {
  center: [0, 0] as [number, number],
  zoom: 2,
};

export const GEO_EDITOR_CONFIG = {
  position: 'top-left' as const,
  toolbarOrientation: 'vertical' as const,
  columns: 2,
  drawModes: [
    'polygon',
    'line',
    'rectangle',
    'circle',
    'marker',
    'freehand',
  ] as DrawMode[],
  editModes: [
    'select',
    'drag',
    'change',
    'rotate',
    'cut',
    'delete',
    'scale',
    'copy',
    'split',
    'union',
    'difference',
    'simplify',
    'lasso',
  ] as EditMode[],
  showFeatureProperties: true,
  fitBoundsOnLoad: true,
};

export const LAYER_CONTROL_CONFIG = {
  collapsed: false,
  panelWidth: 350,
  panelMinWidth: 240,
  panelMaxWidth: 450,
};

export const LEGEND_CONFIG = {
  title: 'Layer Types',
  items: [
    { label: 'Points of Interest', color: '#e74c3c', shape: 'circle' as const },
    { label: 'National Parks', color: '#2ecc71', shape: 'square' as const },
    { label: 'Rivers', color: '#3498db', shape: 'line' as const },
    { label: 'Roads', color: '#95a5a6', shape: 'line' as const },
    { label: 'Cities', color: '#9b59b6', shape: 'circle' as const },
  ],
  collapsible: true,
  collapsed: false,
  width: 180,
  position: 'bottom-left' as const,
};
