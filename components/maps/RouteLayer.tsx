"use client";

import { useEffect } from "react";
import { Source, Layer, MapRef } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";

interface RouteLayerProps {
  route: any;
  mapRef: React.RefObject<MapRef>;
  onFit?: () => void;
}

export default function RouteLayer({ route, mapRef, onFit }: RouteLayerProps) {
  useEffect(() => {
    if (!route || !mapRef.current) return;

    const coordinates = route.geometry.coordinates as [number, number][];

    const bounds = coordinates.reduce(
      (bounds: mapboxgl.LngLatBounds, coord: [number, number]) =>
        bounds.extend(coord),
      new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
    );

    mapRef.current.fitBounds(bounds, {
      padding: { top: 120, bottom: 200, left: 50, right: 50 },
      duration: 1500,
    });

    if (onFit) onFit();
  }, [route, mapRef, onFit]);

  if (!route) return null;

  return (
    <Source id="route" type="geojson" data={route}>
      <Layer
        id="route-line"
        type="line"
        paint={{
          "line-color": "#0ea5e9",
          "line-width": 5,
          "line-opacity": 0.95,
          "line-blur": 0.5,
        }}
      />
      <Layer
        id="route-line-glow"
        type="line"
        paint={{
          "line-color": "#38bdf8",
          "line-width": 14,
          "line-opacity": 0.2,
          "line-blur": 6,
        }}
      />
    </Source>
  );
}