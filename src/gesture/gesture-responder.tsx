import React, { FC, useRef } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import type { TouchPoint } from '../types';
import type { IGestureProps } from './types';
/**
 * PanResponder & native event descriptions
 * NATIVE_EVENT
 * - changedTouches - Array of all touch events that have changed since the last event
 * - identifier - The ID of the touch
 * - locationX - The X position of the touch, relative to the element
 * - locationY - The Y position of the touch, relative to the element
 * - pageX - The X position of the touch, relative to the root element
 * - pageY - The Y position of the touch, relative to the root element
 * - target - The node id of the element receiving the touch event
 * - timestamp - A time identifier for the touch, useful for velocity calculation
 * - touches - Array of all current touches on the screen
 *
 * GESTURE_STATE
 * - stateID - ID of the gestureState- persisted as long as there at least one touch on screen
 * - moveX - the latest screen coordinates of the recently-moved touch
 * - moveY - the latest screen coordinates of the recently-moved touch
 * - x0 - the screen coordinates of the responder grant
 * - y0 - the screen coordinates of the responder grant
 * - dx - accumulated distance of the gesture since the touch started
 * - dy - accumulated distance of the gesture since the touch started
 * - vx - current velocity of the gesture
 * - vy - current velocity of the gesture
 * - numberActiveTouches - Number of touches currently on screen
 */

const GestureHandler: FC<IGestureProps> = ({
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
      onPanResponderRelease: () => {
        const points = [...pathRef.current];
        onChangeTouchEvents(points);
        onEndTouchEvents && onEndTouchEvents(points);
      },
    })
  ).current;

  return <View style={StyleSheet.absoluteFill} {...panResponder.panHandlers} />;
};

export default GestureHandler;
