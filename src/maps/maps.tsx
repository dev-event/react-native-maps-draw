import React, {
  useRef,
  RefObject,
  useCallback,
  forwardRef,
  useMemo,
} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Canvas } from '../canvas';
import { GestureHandler } from '../gesture';
import { OverlayPolygon } from '../polygon';
import type { IMapProps } from './types';
import { DEFAULT_INDEX_INITIAL_LAT_LNG } from './contstant';
import * as _GEO from 'geolib';

export default forwardRef<MapView, IMapProps>(
  (
    {
      points,
      colorLine = 'tomato',
      children,
      widthLine = 3,
      onEndDraw,
      isDrawMode = false,
      renderPath,
      onStartDraw,
      onChangePoints,
      widthOverlayLine = 3,
      fillOverlay = '#181829',
      fillColorCanvas = 'none',
      styleViewGesture,
      backgroundCanvas = 'rgba(0,0,0,0.30)',
      renderContentGesture,
      renderOverlayPolygon,
      colorWidthOverlayLine = 'yellow',
      backgroundOverlayPolygon = 'rgba(0,0,0,0.20)', //когда закончили рисовать - фон
      ...rest
    },
    ref
  ) => {
    const internalRef = useRef<MapView>(null);
    const mapRef = (ref as RefObject<MapView>) || internalRef;

    const containerStyle = useMemo(
      () => [
        { zIndex: 1, backgroundColor: backgroundCanvas },
        StyleSheet.absoluteFill,
        styleViewGesture,
      ],
      [backgroundCanvas, styleViewGesture]
    );

    const path = useMemo(
      () => points.map((item) => `${item.x},${item.y}`).join(' '),
      [points]
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
      async (data) => {
        await Promise.all(data.map(convertByPoint)).then(
          convertPointToCoordinates
        );
      },
      [convertByPoint, convertPointToCoordinates]
    );

    const renderMapPolygonOverlay = useMemo(() => {
      if (renderOverlayPolygon === null) {
        return null;
      }

      return renderOverlayPolygon === undefined && !!path && points ? (
        <OverlayPolygon
          {...{
            path,
            fillOverlay,
            widthOverlayLine,
            colorWidthOverlayLine,
            backgroundOverlayPolygon,
          }}
        />
      ) : (
        renderOverlayPolygon(path)
      );
    }, [
      path,
      points,
      fillOverlay,
      widthOverlayLine,
      renderOverlayPolygon,
      colorWidthOverlayLine,
      backgroundOverlayPolygon,
    ]);

    const hasCanvas = useMemo(() => {
      return (
        <SafeAreaView style={containerStyle}>
          {isDrawMode ?
            <>
              {renderContentGesture && renderContentGesture(points)}
              {renderPath ? (
                renderPath(path)
              ) : (
                <Canvas
                  path={path}
                  widthLine={widthLine}
                  colorLine={colorLine}
                  fillColorCanvas={fillColorCanvas}
                />
              )}

              <GestureHandler
                onEndTouchEvents={handleEndDraw}
                onStartTouchEvents={onStartDraw}
                onChangeTouchEvents={onChangePoints}
              />
            </>
           : renderMapPolygonOverlay}
        </SafeAreaView>
      )}, [
      path,
      points,
      widthLine,
      colorLine,
      renderPath,
      isDrawMode,
      onStartDraw,
      containerStyle,
      onChangePoints,
      fillColorCanvas,
      renderContentGesture,
      renderMapPolygonOverlay,
    ]);

    const hasMap = (
      <MapView scrollEnabled={!isDrawMode} ref={mapRef} {...rest}>
        {children}
      </MapView>
    );

    return (
      <>
        {hasCanvas}
        {hasMap}
      </>
    );
  }
);
