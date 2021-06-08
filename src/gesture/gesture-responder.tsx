import React, { FC, useRef } from 'react';
import {
  PanResponder,
  StyleSheet,
  View,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import type { TouchPoint } from '../types';

interface GestureProps {
  onEndTouchEvents?: (
    event: GestureResponderEvent,
    state: PanResponderGestureState,
    points: TouchPoint[]
  ) => void;
  onStartTouchEvents?: (
    event: GestureResponderEvent,
    state: PanResponderGestureState
  ) => void;
  onChangeTouchEvents: (points: TouchPoint[]) => void;
}

const GestureHandler: FC<GestureProps> = ({
  onEndTouchEvents,
  onStartTouchEvents,
  onChangeTouchEvents,
}) => {
  const pathRef = useRef<TouchPoint[]>([]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        pathRef.current = [];
        onStartTouchEvents && onStartTouchEvents(e, gestureState);
      },
      onPanResponderMove: (event) => {
        pathRef.current.push({
          x: event.nativeEvent.locationX,
          y: event.nativeEvent.locationY,
        });
        onChangeTouchEvents([...pathRef.current]);
      },
      onPanResponderRelease: (e, gestureState) => {
        const points = [...pathRef.current];
        onChangeTouchEvents(points);
        onEndTouchEvents && onEndTouchEvents(e, gestureState, points);
      },
    })
  ).current;

  return <View style={StyleSheet.absoluteFill} {...panResponder.panHandlers} />;
};

export { GestureHandler };
