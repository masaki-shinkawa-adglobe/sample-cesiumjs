// use client directive
"use client";

// Cesium static assets のベースURLを指定
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).CESIUM_BASE_URL = '/Cesium';

import { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';

// Cesium Ion のアクセストークンを設定
Cesium.Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN || '';

export default function MapViewer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = mapContainer.current;
    if (!container) return;
    (async () => {
      // Cesium Viewer 初期化（3D Tiles, 垂直誇張）
      const viewer = new Cesium.Viewer(container, {
        timeline: false,
        animation: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        geocoder: Cesium.IonGeocodeProviderType.GOOGLE,
        globe: false,
      });
      const { scene } = viewer;
      // 垂直誇張と空気感設定
      scene.verticalExaggeration = 3.0;
      scene.skyAtmosphere.show = true;
      // 3D Tiles を追加
      try {
        const tileset = await Cesium.createGooglePhotorealistic3DTileset({ onlyUsingWithGoogleGeocoder: true });
        scene.primitives.add(tileset);
      } catch (error) {
        console.error(`Error loading Photorealistic 3D Tiles tileset: ${error}`);
      }
      // sample.kml を読み込んで表示
      try {
        const kml = await Cesium.KmlDataSource.load('/kml/sample.kml', { clampToGround: false });
        viewer.dataSources.add(kml);
        await viewer.flyTo(kml);
      } catch (e) {
        console.error('KML load error:', e);
      }
    })();
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
}
