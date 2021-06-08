import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import MapView, { MapViewProps } from 'react-native-maps';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Canvas } from '../canvas';
import { GestureHandler } from '../gesture';
import type { TouchPoint } from '../types';
import { PanGestureHandler } from 'react-native-gesture-handler';

interface MapProps extends MapViewProps {
  children: ReactNode;
  isDrawMode?: boolean;
  renderPath?: (points: TouchPoint[]) => FC | null;
  isGestureEvent?: boolean;
  isVisibleCanvas?: boolean;
  styleViewGesture?: StyleProp<ViewStyle>;
}
const Map: FC<MapProps> = ({
  children,
  isDrawMode = false,
  renderPath,
  isGestureEvent = true,
  isVisibleCanvas = true,
  styleViewGesture,
  ...rest
}) => {
  const [path, setPath] = useState<TouchPoint[]>([]);

  const handleOnPath = useCallback((points) => setPath(points), []);

  const hasCanvas = useMemo(() => {
    return (
      <View style={[StyleSheet.absoluteFill, { zIndex: 1 }, styleViewGesture]}>
        {isVisibleCanvas && renderPath ? (
          renderPath(path)
        ) : (
          <Canvas path={path} />
        )}
        {isGestureEvent && (
          <GestureHandler onChangeTouchEvents={handleOnPath} />
        )}
      </View>
    );
  }, [
    path,
    renderPath,
    handleOnPath,
    isGestureEvent,
    isVisibleCanvas,
    styleViewGesture,
  ]);

  const hasMap = <MapView {...rest}>{children}</MapView>;

  return (
    <PanGestureHandler>
      {/*{isDrawMode ? hasCanvas : null}*/}
      {hasMap}
    </PanGestureHandler>
  );
};

export default Map;
