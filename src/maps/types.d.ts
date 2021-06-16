import MapView, { MapViewProps } from 'react-native-maps';
import { FC, ReactNode, Ref } from 'react';
import { TouchPoint } from '../types';
import {
  GestureResponderEvent,
  PanResponderGestureState,
  StyleProp,
  ViewStyle,
} from 'react-native';
import type { ICanvasProps } from '../canvas';
import type { IPolygonProps } from '../polygon';

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

export interface IMapProps extends MapViewProps, ICanvasProps, IPolygonProps {
  ref?: Ref<MapView>;
  children?: ReactNode;
  onEndDraw?: (item: IDrawResult) => void;
  isDrawMode: boolean;
  renderPath?: (points: TouchPoint[]) => FC | null;
  onStartDraw: () => void;
  isGestureEvent?: boolean;
  backgroundCanvas?: string;
  styleViewGesture?: StyleProp<ViewStyle>;
  renderContentGesture?: (points: TouchPoint[]) => FC | null;
  renderOverlayPolygon?: (points: TouchPoint[]) => FC | null;
  backgroundOverlayPolygon?: string;
}
