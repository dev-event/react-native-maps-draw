import React, { FC, useRef } from 'react';
import { PanResponder, View } from 'react-native';
import type { TouchPoint } from '../../types';
import type { IGestureControlShapeProps } from '../types';

const GesturePointersHandler: FC<IGestureControlShapeProps> = ({
    onEndTouchEvents,
    onStartTouchEvents,
}) => {
    const pathRef = useRef<TouchPoint[]>([]);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: (event, gestureState) => {
            pathRef.current.push({
                x: event.nativeEvent.locationX,
                y: event.nativeEvent.locationY,
            });
            onStartTouchEvents?.(event, gestureState);

            return true;
        },
        onMoveShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponderCapture: () => false,
        onPanResponderGrant: () => false,
        onPanResponderMove: () => {},
        onPanResponderRelease: (event) => {
            pathRef.current.push({
                x: event.nativeEvent.locationX,
                y: event.nativeEvent.locationY,
            });
            onEndTouchEvents?.(pathRef.current);
        },
    });

    return (
        <View
            style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            }}
            {...panResponder.panHandlers}
        />
    );
};

export default GesturePointersHandler;
