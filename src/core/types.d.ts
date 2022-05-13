import { GestureResponderEvent, PanResponderGestureState } from 'react-native';
import type { TouchPoint } from '../../types';

export type IGestureControlShapeProps = {
    onEndTouchEvents?: (points: TouchPoint[]) => void;
    onStartTouchEvents?: (
        event: GestureResponderEvent,
        state: PanResponderGestureState,
    ) => void;
};
export type IGestureControlProps = {
    onChangeTouchEvents: (points: TouchPoint[]) => void;
} & IGestureControlShapeProps;
