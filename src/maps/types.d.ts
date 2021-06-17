import MapView, { MapViewProps } from 'react-native-maps';
import { FC, ReactNode, Ref } from 'react';
import { TouchPoint } from '../types';
import {
  GestureResponderEvent,
  PanResponderGestureState,
  StyleProp,
  ViewStyle,
} from 'react-native';
export interface ILocationProps {
  latitude: number;
  longitude: number;
}

export interface IGestureCoordinates {
  event: GestureResponderEvent;
  state: PanResponderGestureState;
  points: TouchPoint[];
}
export interface IDrawResult {
  polygons: ILocationProps[];
  lastLatLng: ILocationProps;
  initialLatLng: ILocationProps;
  centerLatLng: false | ILocationProps;
}

export interface IMapProps extends MapViewProps {
  ref?: Ref<MapView>;
  points: TouchPoint[];
  children?: ReactNode;
  colorLine?: string;
  widthLine?: number;
  onEndDraw?: (item: IDrawResult) => void;
  isDrawMode: boolean;
  renderPath?: (path: string) => FC | null;
  onStartDraw: () => void;
  fillOverlay?: string;
  onChangePoints: (points: TouchPoint[]) => void;
  fillColorCanvas?: string;
  backgroundCanvas?: string;
  widthOverlayLine?: number;
  styleViewGesture?: StyleProp<ViewStyle>;
  renderContentGesture?: (points: TouchPoint[]) => FC | null;
  renderOverlayPolygon?: (points: string) => FC | null;
  colorWidthOverlayLine?: string;
  backgroundOverlayPolygon?: string;
}
