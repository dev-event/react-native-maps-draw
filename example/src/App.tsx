import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Text } from 'react-native';
import MapView, { ILocationProps, IDrawResult, TouchPoint, Marker } from '../../src';
import { MarkerLocation } from './assets';
import AnimatedPolygon from './components/polygon';

export default function App() {
  const mapRef = useRef<MapView>(null);

  const initialPolygon = useRef({
    polygons: [],
    distance: 0,
    lastLatLng: undefined,
    initialLatLng: undefined,
    centerLatLng: undefined,
  });

  const [modePolygon, setPolygonCreated] = useState<boolean>(false);

  const [isActiveDraw, setDrawMode] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [points, setPoints] = useState<TouchPoint[]>([]);

  const [polygon, setPolygon] = useState<IDrawResult>(initialPolygon.current);

  const handleMapReady = useCallback(() => mapRef.current && setIsReady(true), []);

  const handleRemovePolygon = useCallback(() => {
    setPolygon(initialPolygon.current);
    setPolygonCreated(false);
  }, []);

  const handleClear = useCallback(() => {
    setPolygon(initialPolygon.current);
    setPolygonCreated(false);
    setPoints([]);
  }, []);

  const handleIsDraw = useCallback(() => {
    if (!mapRef.current) return;
    if (!isActiveDraw) {
      zoomOut().then(handleClear);
    }
    setDrawMode((prevMode) => !prevMode);
  }, [handleClear, isActiveDraw]);

  const handleCanvasEndDraw = useCallback((locations) => {
    zoomCenterPolygon(locations.centerLatLng).then(() => {
      setPolygon(locations);
      setPolygonCreated(true);
    });
    setDrawMode((prevMode) => !prevMode);
  }, []);

  const zoomCenterPolygon = async (center: ILocationProps) => {
    if (!mapRef.current) return;
    const camera = await mapRef.current.getCamera();
    if (Platform.OS === 'ios') {
      mapRef.current.animateCamera({
        center: center,
        // altitude: camera.altitude / 2,
      });
    }
    if (Platform.OS === 'android') {
      // mapRef.current.animateCamera({ center, zoom: camera.zoom + 1 });
    }
  };

  const zoomOut = async () => {
    if (!mapRef.current) return false;

    const camera = await mapRef.current.getCamera();
    if (Platform.OS === 'ios') {
      mapRef.current.animateCamera({ altitude: camera.altitude * 1 });
    }

    if (Platform.OS === 'android') {
      mapRef.current.animateCamera({ zoom: camera.zoom - 1 });
    }
  };

  const hasMarkerClose = polygon.centerLatLng && (
    <Marker onPress={handleRemovePolygon} coordinate={polygon.centerLatLng}>
      <MarkerLocation />
    </Marker>
  );

  const handlePolygon = useCallback(
    (item, index) => <AnimatedPolygon key={index} coordinates={polygon.polygons} />,
    [polygon.polygons]
  );

  const onChangePoints = useCallback((value) => {
    setPoints(value);
  }, []);

  //
  // const hasOverlay = useMemo(() => {
  //   if (renderOverlayPolygon === null) {
  //     return null;
  //   }
  //
  //   return renderOverlayPolygon !== undefined
  //     ? renderOverlayPolygon(path)
  //     : !!path && (
  //         <OverlayPolygon
  //           {...{
  //             path,
  //             fillOverlay,
  //             widthOverlayLine,
  //             colorWidthOverlayLine,
  //             backgroundOverlayPolygon,
  //           }}
  //         />
  //       );
  // }, [
  //   path,
  //   fillOverlay,
  //   widthOverlayLine,
  //   renderOverlayPolygon,
  //   colorWidthOverlayLine,
  //   backgroundOverlayPolygon,
  // ]);
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        points={points}
        widthLine={3}
        onEndDraw={handleCanvasEndDraw}
        isDrawMode={isActiveDraw}
        onMapReady={handleMapReady}
        onStartDraw={handleClear}
        createdPolygon={modePolygon}
        onChangePoints={onChangePoints}
        backgroundCanvas={'rgba(0, 0, 0, 0.0)'}
      >
        {isReady && modePolygon && polygon.polygons && polygon.polygons.length > 0 && (
          <>
            {hasMarkerClose}
            {polygon.polygons.map(handlePolygon)}
          </>
        )}
      </MapView>

      <TouchableOpacity style={styles.button} onPress={handleIsDraw}>
        {isActiveDraw ? (
          <Text style={styles.title}>ON</Text>
        ) : (
          <Text style={styles.title}>OFF</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    top: '10%',
    right: '10%',
    position: 'absolute',
    backgroundColor: 'tomato',
    padding: 16,
    zIndex: 4,
    borderRadius: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
