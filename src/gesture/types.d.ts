import { GestureResponderEvent, PanResponderGestureState } from 'react-native';
import type { TouchPoint } from '../types';

export interface IGestureProps {
  onEndTouchEvents?: (points: TouchPoint[]) => void;
  onStartTouchEvents?: (
    event: GestureResponderEvent,
    state: PanResponderGestureState
  ) => void;
  onChangeTouchEvents: (points: TouchPoint[]) => void;
}
