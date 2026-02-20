# React Beginner's Guide

This guide explains how this React MapLibre application is structured.

## Application Flow

```
index.html → main.tsx → App.tsx → Map.tsx → useMapLibre.ts
```

## 1. Entry Point: `index.html`

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

This is where React will inject your app. The `<div id="root">` is an empty container that React fills with your components.

## 2. React Bootstrap: `src/main.tsx`

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- `createRoot()` - Creates a React root attached to the DOM element
- `<StrictMode>` - Development helper that warns about potential problems
- `<App />` - Your main application component

## 3. Main Component: `src/App.tsx`

```tsx
function App() {
  return (
    <div className="app">
      <Map />
    </div>
  );
}
```

- **Components** are functions that return JSX (HTML-like syntax)
- `<Map />` is a child component rendered inside App

## 4. Map Component: `src/components/Map/Map.tsx`

```tsx
function Map() {
  const containerRef = useRef<HTMLDivElement>(null);  // 1. Create a reference
  useMapLibre({ container: containerRef });            // 2. Use custom hook
  return <div ref={containerRef} className="map-container" />;  // 3. Render div
}
```

### Key Concepts

- **`useRef`** - Creates a reference to a DOM element. MapLibre needs a real DOM element to render the map into.
- **Custom Hook (`useMapLibre`)** - Encapsulates all the MapLibre logic

## 5. Custom Hook: `src/hooks/useMapLibre.ts`

```tsx
export function useMapLibre({ container }) {
  const mapRef = useRef(null);           // Store map instance
  const [isLoaded, setIsLoaded] = useState(false);  // Track loading state

  useEffect(() => {
    // This runs AFTER the component renders
    const map = new maplibregl.Map({
      container: container.current,  // The DOM element
      style: BASE_MAP_STYLE,
      center: [0, 0],
      zoom: 2,
    });

    map.on('load', () => {
      // Add layers, controls, etc.
      setIsLoaded(true);
    });

    // Cleanup when component unmounts
    return () => { map.remove(); };
  }, []);  // Empty array = run only once

  return { map: mapRef.current, isLoaded };
}
```

## Key React Hooks

| Hook | Purpose |
|------|---------|
| `useState` | Store data that changes over time (triggers re-render) |
| `useRef` | Store values that persist without causing re-renders |
| `useEffect` | Run code after render (for side effects like API calls) |
| `useCallback` | Memoize functions to prevent unnecessary re-creation |

## Why This Pattern?

MapLibre is an **imperative** library (you tell it what to do step by step), but React is **declarative** (you describe what you want). The custom hook bridges this gap:

1. React renders an empty `<div>`
2. `useEffect` runs after render and creates the map in that div
3. The map instance is stored in `useRef` (not `useState`) because we don't want re-renders when the map changes internally
4. Cleanup function removes the map when the component unmounts

## File Organization

```
src/
├── components/     # UI components (what you see)
├── hooks/          # Custom hooks (reusable logic)
├── config/         # Constants and configuration
├── data/           # Static data (GeoJSON, etc.)
```

This separation keeps code organized and reusable.

## Common React Patterns Used

### 1. Barrel Exports (`index.ts` files)

```tsx
// src/components/index.ts
export { Map } from './Map';

// Usage in other files
import { Map } from './components';  // Clean imports
```

### 2. Props (Passing Data to Components)

```tsx
// Parent passes data to child
<Map initialZoom={5} center={[0, 0]} />

// Child receives via props
function Map({ initialZoom, center }) {
  // Use the values
}
```

### 3. Ref Forwarding

```tsx
const containerRef = useRef<HTMLDivElement>(null);
return <div ref={containerRef} />;
```

The `ref` connects React to the actual DOM element, which is needed for libraries like MapLibre that manipulate the DOM directly.

## Lifecycle Overview

```
1. Component mounts
   ↓
2. React renders JSX (empty div with ref)
   ↓
3. useEffect runs (map is created)
   ↓
4. Map 'load' event fires (layers/controls added)
   ↓
5. Component unmounts
   ↓
6. Cleanup function runs (map.remove())
```

## Adding a New Component

Here's how to add a new component, using the Sidebar as an example:

### 1. Create the Component Directory

```
src/components/Sidebar/
├── Sidebar.tsx      # Component logic
├── Sidebar.css      # Component styles
└── index.ts         # Barrel export
```

### 2. Write the Component

```tsx
// src/components/Sidebar/Sidebar.tsx
import { useState } from 'react';
import './Sidebar.css';

interface SidebarProps {
  mapCenter?: [number, number];
  mapZoom?: number;
}

export function Sidebar({ mapCenter, mapZoom }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'layers'>('info');

  return (
    <aside className="sidebar">
      <h1>MapLibre React</h1>
      <p>Center: {mapCenter ? `${mapCenter[0]}, ${mapCenter[1]}` : 'Loading...'}</p>
      <p>Zoom: {mapZoom?.toFixed(2) ?? 'Loading...'}</p>
    </aside>
  );
}
```

### 3. Create the Barrel Export

```tsx
// src/components/Sidebar/index.ts
export { Sidebar } from './Sidebar';
```

### 4. Add to Components Index

```tsx
// src/components/index.ts
export { Map } from './Map';
export { Sidebar } from './Sidebar';  // Add this line
```

### 5. Use in App.tsx

```tsx
import { useState, useCallback } from 'react';
import { Map, Sidebar } from './components';

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
```

### Key Patterns

| Pattern | Description |
|---------|-------------|
| **Props** | Pass data down from parent (`mapCenter`, `mapZoom`) |
| **Callbacks** | Pass functions up to parent (`onMove`) |
| **State lifting** | Store shared state in common ancestor (`App.tsx`) |
| **TypeScript interfaces** | Define prop types for type safety |

### Component Communication Flow

```
App.tsx (state: mapCenter, mapZoom)
   │
   ├── Sidebar (receives: mapCenter, mapZoom)
   │      └── Displays the values
   │
   └── Map (receives: onMove callback)
          └── Calls onMove when map moves
```

The parent component (`App`) holds the state and passes:
- **Data down** to `Sidebar` via props
- **Callbacks down** to `Map` so it can report changes back up

## Further Reading

- [React Documentation](https://react.dev/)
- [React Hooks](https://react.dev/reference/react/hooks)
- [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)
- [Vite](https://vitejs.dev/)
