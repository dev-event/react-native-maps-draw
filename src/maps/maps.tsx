import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { DrawControl } from '../components';
import type { TMap, TLocation } from '../types';
import {
  DEFAULT_ACTIVE_COLOR_LINE_WIDTH,
  DEFAULT_FILL_BACKGROUND_CANVAS,
  DEFAULT_BACKGROUND_VIEW_CANVAS,
  DEFAULT_INDEX_INITIAL_LAT_LNG,
  DEFAULT_ACTIVE_COLOR_LINE,
  DEFAULT_UNIT_DISTANCE,
} from '../constants/map.contstant';
import * as _GEO from 'geolib';
import useValidator from '../hooks/use-validator';

export default (props: TMap) => {
  useValidator(props);
  const {
    points,
    convertByPoint,
    colorLine = DEFAULT_ACTIVE_COLOR_LINE,
    widthLine = DEFAULT_ACTIVE_COLOR_LINE_WIDTH,
    onEndDraw,
    onStartDraw,
    unitDistance = DEFAULT_UNIT_DISTANCE,
    onChangePoints,
    fillColorCanvas = DEFAULT_FILL_BACKGROUND_CANVAS,
    styleViewGesture,
    backgroundCanvas = DEFAULT_BACKGROUND_VIEW_CANVAS,
  } = props;
  const { width, height } = useWindowDimensions();
  const [containerSize, setContainerSize] = useState({ width, height });

  const containerStyle = useMemo(
    () => [
      { zIndex: 1, backgroundColor: backgroundCanvas },
      StyleSheet.absoluteFill,
      styleViewGesture,
    ],
    [backgroundCanvas, styleViewGesture]
  );

  const path = useMemo(
    () => points.map((item: any) => `${item.x},${item.y}`).join(' '),
    [points]
  );

  const calculatedCenterPolygon = (coordinates: TLocation[]) =>
    Promise.resolve(_GEO.getCenter(coordinates));

  const convertPointToCoordinates = useCallback(
    (polygons) => {
      const lengthPolygon = polygons.length;
      if (polygons && lengthPolygon > 0) {
        calculatedCenterPolygon(polygons).then((centerLatLng) => {
          if (onEndDraw && centerLatLng) {
            const distance = _GEO.convertDistance(
              _GEO.getPathLength(polygons),
              unitDistance
            );
            const initialLatLng = polygons[DEFAULT_INDEX_INITIAL_LAT_LNG];
            const lastLatLng = polygons[lengthPolygon - 1];
            onEndDraw({
              polygons,
              distance,
              centerLatLng,
              initialLatLng,
              lastLatLng,
            });
          }
        });
      }
    },
    [onEndDraw, unitDistance]
  );

  const handleEndDraw = useCallback(
    async (data) => {
      await Promise.all(data.map(convertByPoint)).then(
        convertPointToCoordinates
      );
    },
    [convertByPoint, convertPointToCoordinates]
  );

  const handleSetContainerSize = useCallback((event) => {
    setContainerSize({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }, []);

  return (
    <View style={containerStyle} onLayout={handleSetContainerSize}>
      <DrawControl
        path={path}
        widthLine={widthLine}
        colorLine={colorLine}
        containerSize={containerSize}
        fillColorCanvas={fillColorCanvas}
        onEndTouchEvents={handleEndDraw}
        onStartTouchEvents={onStartDraw}
        onChangeTouchEvents={onChangePoints}
      />
    </View>
  );
};
