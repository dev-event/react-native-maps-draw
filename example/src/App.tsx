import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, { ILocationProps } from '../../src';
import { MarkerLocation } from './assets';
import { Marker, Overlay, Polygon } from 'react-native-maps';


export default function App() {
  const mapRef = useRef<MapView>(null);

  const initialPolygon = useRef({
    polygons: [],
    lastLatLng: undefined,
    initialLatLng: undefined,
    centerLatLng: undefined,
  });

  const [isActiveDraw, setDrawMode] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [polygon, setPolygon] = useState<{
    polygons: ILocationProps[];
    lastLatLng: ILocationProps;
    initialLatLng: ILocationProps;
    centerLatLng: ILocationProps;
  }>(initialPolygon.current);

  const handleMapReady = useCallback(
    () => mapRef.current && setIsReady(true),
    []
  );

  const handleIsDraw = useCallback(() => {
    if (!mapRef.current) return;
    setDrawMode((prevMode) => !prevMode);
  }, [mapRef]);

  const handleCanvasDraw = useCallback(
    (locations) => {
      setPolygon(locations);
      handleIsDraw();
    },
    [handleIsDraw]
  );
  const handleRemovePolygon = useCallback(
    () => setPolygon(initialPolygon.current),
    []
  );
  // const getCameraMap = () => Promise.resolve(mapRef.current.getCamera());

  // const zoomCenterPolygon = (center: ILocationProps): boolean => {
  //   if (!mapRef.current) return false;
  //   getCameraMap().then((camera) => {
  //     if (Platform.OS === 'ios') {
  //       mapRef.current.animateCamera({
  //         center: center,
  //         altitude: camera.altitude / 2,
  //       });
  //     }
  //     if (Platform.OS === 'android') {
  //       mapRef.current.animateCamera({ center, zoom: camera.zoom + 1 });
  //     }
  //   });
  //   return true;
  // };

  // const zoomOut = async () => {
  //   if (!ref.current) {
  //     return;
  //   }
  //   const camera = await ref.current.getCamera();
  //   if (Platform.OS === 'ios') {
  //     ref.current.animateCamera({altitude: camera.altitude * 2});
  //   } else {
  //     ref.current.animateCamera({zoom: camera.zoom - 1});
  //   }
  // };

  const hasMarkerClose = polygon.centerLatLng && (
    <Marker onPress={handleRemovePolygon} coordinate={polygon.centerLatLng}>
      <MarkerLocation />
    </Marker>
  );

  const handlePolygon = useCallback(
    (item, index) => (
      <Polygon
        key={index}
        coordinates={polygon.polygons}
        fillColor="rgba(0, 0, 0, 0.00)"
        strokeColor="rgba(0, 0, 0, 0.00)"
        strokeWidth={1}
      />
    ),
    [polygon.polygons]
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        onStartDraw={handleRemovePolygon}
        onEndDraw={handleCanvasDraw}
        isDrawMode={isActiveDraw}
        onMapReady={handleMapReady}
        colorWidthOverlayLine={'red'}
        renderContentGesture={() => <Text>test</Text>}
      >
        {isReady && polygon.polygons && polygon.polygons.length > 0 && (
          <>
            {hasMarkerClose}
            {polygon.polygons.map(handlePolygon)}
          </>
        )}
      </MapView>

      {!isActiveDraw ? (
        <TouchableOpacity style={styles.button} onPress={handleIsDraw}>
          <Text>{'start'}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    bottom: '10%',
    right: '10%',
    position: 'absolute',
    padding: 16,
    zIndex: 4,
    backgroundColor: 'yellow',
borderRadius: 24
  },
});
