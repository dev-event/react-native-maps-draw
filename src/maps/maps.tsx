import React, {
  useRef,
  RefObject,
  useCallback,
  forwardRef,
  useMemo,
  useState,
} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Canvas } from '../canvas';
import { GestureHandler } from '../gesture';
import { MapPolygon } from '../polygon';
import type { TouchPoint } from '../types';
import type { IMapProps } from './types';
import { DEFAULT_INDEX_INITIAL_LAT_LNG } from './contstant';
import * as _GEO from 'geolib';

export default forwardRef<MapView, IMapProps>(
  (
    {
      colorLine = '#181829',
      children,
      widthLine = 2,
      onEndDraw,
      isDrawMode = false,
      renderPath,
      onStartDraw,
      widthOverlayLine = 3,
      fillOverlay = '#181829',
      fillColorCanvas = 'none',
      styleViewGesture,
      backgroundCanvas = 'rgba(0,0,0,0.30)', //когда рисуем - фон
      renderContentGesture,
      renderOverlayPolygon,
      colorWidthOverlayLine = '#FFFFFF',
      backgroundOverlayPolygon = 'rgba(0,0,0,0.20)', //когда закончили рисовать - фон
      ...rest
    },
    ref
  ) => {
    const internalRef = useRef<MapView>(null);
    const initialPath = useRef<TouchPoint[]>([]);

    const mapRef = (ref as RefObject<MapView>) || internalRef;
    const [path, setPath] = useState<TouchPoint[]>(initialPath.current);
    const handleOnPath = useCallback((points) => setPath(points), []);

    const containerStyle = useMemo(
      () => [
        { zIndex: 1, backgroundColor: backgroundCanvas },
        StyleSheet.absoluteFill,
        styleViewGesture,
      ],
      [backgroundCanvas, styleViewGesture]
    );

    const calculatedCenterPolygon = (coordinates) =>
      Promise.resolve(_GEO.getCenter(coordinates));

    const convertPointToCoordinates = useCallback(
      (polygons) => {
        if (polygons && polygons.length > 0) {
          calculatedCenterPolygon(polygons).then((centerLatLng) => {
            if (onEndDraw && centerLatLng) {
              const initialLatLng = polygons[DEFAULT_INDEX_INITIAL_LAT_LNG];
              const lastLatLng = polygons[polygons.length - 1];
              onEndDraw({
                polygons,
                centerLatLng,
                initialLatLng,
                lastLatLng,
              });
              // setPath(initialPath.current);
            }
          });
        }
      },
      [onEndDraw]
    );

    const convertByPoint = useCallback(
      async (item) => await mapRef.current?.coordinateForPoint(item),
      [mapRef]
    );

    const handleEndDraw = useCallback(
      async (points) => {
        await Promise.all(points.map(convertByPoint)).then(
          convertPointToCoordinates
        );
      },
      [convertByPoint, convertPointToCoordinates]
    );

    const points = useMemo(
      () => path.map((item) => `${item.x},${item.y}`).join(' '),
      [path]
    );

    const hasCanvas = useMemo(() => {
      return (
        isDrawMode && (
          <SafeAreaView style={containerStyle}>
            {renderContentGesture && renderContentGesture(path)}
            {renderPath ? (
              renderPath(path)
            ) : (
              <Canvas
                points={points}
                widthLine={widthLine}
                colorLine={colorLine}
                fillColorCanvas={fillColorCanvas}
              />
            )}

            <GestureHandler
              onEndTouchEvents={handleEndDraw}
              onStartTouchEvents={onStartDraw}
              onChangeTouchEvents={handleOnPath}
            />
          </SafeAreaView>
        )
      );
    }, [
      isDrawMode,
      containerStyle,
      renderContentGesture,
      path,
      renderPath,
      points,
      colorLine,
      fillColorCanvas,
      widthLine,
      handleEndDraw,
      onStartDraw,
      handleOnPath,
    ]);

    const hasMap = (
      <MapView ref={mapRef} {...rest}>
        {children}
      </MapView>
    );

    const renderMapPolygonOverlay = useCallback(() => {
      if (renderOverlayPolygon === null) {
        return null;
      }

      return renderOverlayPolygon === undefined && !isDrawMode && !!points ? (
        <MapPolygon
          {...{
            points,
            fillOverlay,
            widthOverlayLine,
            colorWidthOverlayLine,
            backgroundOverlayPolygon,
          }}
        />
      ) : (
        renderOverlayPolygon
      );
    }, [
      backgroundOverlayPolygon,
      colorWidthOverlayLine,
      fillOverlay,
      isDrawMode,
      points,
      renderOverlayPolygon,
      widthOverlayLine,
    ]);

    return (
      <>
        {renderMapPolygonOverlay()}
        {hasCanvas}
        {hasMap}
      </>
    );
  }
);
