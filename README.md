# vite-maplibre-react

A React template for building interactive web maps with MapLibre GL JS.

## Features

- **React 19** with TypeScript
- **MapLibre GL JS** for map rendering
- **Vite** for fast development and building
- **Geoman** for geometry drawing and editing
- **GeoEditor** for advanced geometry operations (cut, split, union, difference)
- **Layer Control** for layer visibility management
- **Legend** component for map legends
- GitHub Pages deployment workflow

## Demo

[Live Demo](https://opengeos.org/vite-maplibre-react/)

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/opengeo/vite-maplibre-react.git
cd vite-maplibre-react

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker

### Build Docker Image

```bash
docker build -t vite-maplibre-react .
```

### Run Docker Container

```bash
docker run -p 8080:80 vite-maplibre-react
```

Open http://localhost:8080/vite-maplibre-react/ in your browser.

### Docker Compose (Optional)

Create a `docker-compose.yml` file:

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "8080:80"
```

Then run:

```bash
docker-compose up
```

## Project Structure

```
vite-maplibre-react/
├── src/
│   ├── components/
│   │   └── Map/
│   │       ├── Map.tsx          # Main map component
│   │       ├── Map.css          # Map styles
│   │       └── index.ts
│   ├── hooks/
│   │   ├── useMapLibre.ts       # Custom hook for MapLibre
│   │   └── index.ts
│   ├── data/
│   │   └── countries.ts         # Sample GeoJSON data
│   ├── config/
│   │   └── mapConfig.ts         # Map configuration
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── Dockerfile
└── README.md
```

## Customization

### Change Base Map

Edit `src/config/mapConfig.ts`:

```typescript
export const BASE_MAP_STYLE = "https://your-style-url/style.json";
```

### Add Custom Layers

Modify the `setupLayers` function in `src/hooks/useMapLibre.ts` to add your own data sources and layers.

### Configure GeoEditor

Adjust `GEO_EDITOR_CONFIG` in `src/config/mapConfig.ts` to enable/disable drawing and editing tools.

## Deployment

### GitHub Pages

The repository includes a GitHub Actions workflow for automatic deployment to GitHub Pages. Push to the `main` branch to trigger deployment.

### Manual Deployment

```bash
npm run build
```

Upload the contents of the `dist/` folder to your web server.

## License

[MIT](LICENSE)
