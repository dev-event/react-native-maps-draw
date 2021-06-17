import React, { useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from 'react-native';
import MapView, { ILocationProps } from '../../src';
import { MarkerLocation } from './assets';
import { Marker, Polygon } from 'react-native-maps';
import { TouchPoint } from '../../src/types';

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
  const [points, setPoints] = useState<TouchPoint[]>([]);

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

  const handleRemovePolygon = useCallback(() => {
    setPolygon(initialPolygon.current);
  }, []);

  const handleClear = useCallback(() => {
    setPolygon(initialPolygon.current);
    setPoints([]);
  }, []);

  const handleIsDraw = useCallback(() => {
    if (!mapRef.current) return;
    if (!isActiveDraw) {
      zoomOut().then(handleClear);
    }
    setDrawMode((prevMode) => !prevMode);
  }, [handleClear, isActiveDraw]);

  const handleCanvasDraw = useCallback((locations) => {
    zoomCenterPolygon(locations.centerLatLng).then(() => setPolygon(locations));
    setDrawMode((prevMode) => !prevMode);
  }, []);

  const zoomCenterPolygon = async (center: ILocationProps) => {
    if (!mapRef.current) return;
    const camera = await mapRef.current.getCamera();
    if (Platform.OS === 'ios') {
      mapRef.current.animateCamera({
        center: center,
        altitude: camera.altitude / 1.3,
      });
    }
    if (Platform.OS === 'android') {
      mapRef.current.animateCamera({ center, zoom: camera.zoom + 1 });
    }
  };

  const zoomOut = async () => {
    if (!mapRef.current) return false;

    const camera = await mapRef.current.getCamera();
    if (Platform.OS === 'ios') {
      mapRef.current.animateCamera({ altitude: camera.altitude * 2 });
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
    (item, index) => (
      <Polygon
        key={index}
        coordinates={polygon.polygons}
        fillColor="rgba(0, 0, 0, 0.00)"
        strokeColor="rgba(0, 0, 0, 0.00)"
        strokeWidth={0}
      />
    ),
    [polygon.polygons]
  );

  const handleBlockText = useCallback(() => {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.title}>Draw mode preview</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>What is Lorem Ipsum?</Text>
          <Text style={styles.description} adjustsFontSizeToFit={true}>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </Text>
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={styles.row}>
              <Image
                source={require('../src/assets/pencil.png')}
                resizeMode={'contain'}
                style={{ tintColor: 'white' }}
              />
              <Text style={styles.name}>28 miles</Text>
            </View>

            <View style={styles.row}>
              <Image
                source={require('../src/assets/pencil.png')}
                resizeMode={'contain'}
                style={{ tintColor: 'white' }}
              />
              <Text style={styles.name}>4.5 h</Text>
            </View>

            <View style={styles.row}>
              <Image
                source={require('../src/assets/pencil.png')}
                resizeMode={'contain'}
                style={{ tintColor: 'white' }}
              />
              <Text style={styles.name}>hard</Text>
            </View>
          </View>
        </View>
      </>
    );
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        points={points}
        colorLine={'tomato'}
        onEndDraw={handleCanvasDraw}
        isDrawMode={isActiveDraw}
        onMapReady={handleMapReady}
        onStartDraw={handleClear}
        onChangePoints={setPoints}
        widthLine={3}
        backgroundCanvas={'rgba(25, 0, 64, 0.62)'}
        renderContentGesture={handleBlockText}
      >
        {isReady && polygon.polygons && polygon.polygons.length > 0 && (
          <>
            {hasMarkerClose}
            {polygon.polygons.map(handlePolygon)}
          </>
        )}
      </MapView>

      <TouchableOpacity style={styles.button} onPress={handleIsDraw}>
        {isActiveDraw ? (
          <Image
            source={require('../src/assets/close.png')}
            resizeMode={'contain'}
            style={{ tintColor: 'white' }}
          />
        ) : (
          <Image
            source={require('../src/assets/pencil.png')}
            resizeMode={'contain'}
            style={{ tintColor: 'white' }}
          />
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
    padding: 16,
    zIndex: 4,
    borderRadius: 18,
  },
  content: {
    paddingHorizontal: 18,
    position: 'absolute',
    bottom: 70,
  },
  header: {
    paddingHorizontal: 18,
    position: 'absolute',
    top: 70,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 14,
  },
  description: {
    color: '#DDDDDD',
    fontSize: 14,
    marginBottom: 28,
  },
  name: {
    color: '#DDDDDD',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
