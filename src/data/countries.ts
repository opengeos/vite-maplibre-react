import type { FeatureCollection } from 'geojson';

export const countriesGeoJSON: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'United States' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-125, 25],
            [-125, 49],
            [-66, 49],
            [-66, 25],
            [-125, 25],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Brazil' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73, -33],
            [-73, 5],
            [-34, 5],
            [-34, -33],
            [-73, -33],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'China' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [73, 18],
            [73, 53],
            [135, 53],
            [135, 18],
            [73, 18],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Australia' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [113, -44],
            [113, -10],
            [154, -10],
            [154, -44],
            [113, -44],
          ],
        ],
      },
    },
  ],
};
