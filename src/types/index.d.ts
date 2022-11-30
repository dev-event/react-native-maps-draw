import {
  GestureResponderEvent,
  PanResponderGestureState,
  StyleProp,
  ViewStyle,
} from 'react-native';

export type TTouchPoint = {
  x: number;
  y: number;
};

export type TPath = {
  path: string;
};

export type TContainerSize = {
  width: number;
  height: number;
};

export type TCanvas = {
  colorLine?: string;
  widthLine?: number;
  containerSize: TContainerSize;
  fillColorCanvas?: string;
} & TPath;

export type TGestureControlShape = {
  onEndTouchEvents?: (points: TouchPoint[]) => void;
  onStartTouchEvents?: (
    event: GestureResponderEvent,
    state: PanResponderGestureState
  ) => void;
};
export type TGestureControl = {
  onChangeTouchEvents: (points: TouchPoint[]) => void;
} & TGestureControlShape;

export type TPolygon = {
  fillOverlay?: string;
  widthOverlayLine?: number;
  colorWidthOverlayLine?: string;
  backgroundOverlayPolygon?: string;
} & TPath;

export type TLocation = {
  latitude: number;
  longitude: number;
};

export type TGestureCoordinates = {
  event: GestureResponderEvent;
  state: PanResponderGestureState;
  points: TTouchPoint[];
};
export type TDrawResult = {
  distance: number;
  polygons: TLocation[];
  lastLatLng: TLocation;
  initialLatLng: TLocation;
  centerLatLng: false | TLocation;
};

export type TMap = {
  points: TTouchPoint[];
  colorLine?: string;
  convertByPoint: any;
  widthLine?: number;
  onEndDraw?: (item: TDrawResult) => void;
  // renderPath?: (path: string) => FC | null;
  onStartDraw?: () => void;
  unitDistance?: 'm' | 'km' | 'cm' | 'mm' | 'mi' | 'sm' | 'ft' | 'in' | 'yd';
  onChangePoints: (points: TouchPoint[]) => void;
  fillColorCanvas?: string;
  backgroundCanvas?: string;
  styleViewGesture?: StyleProp<ViewStyle>;
};
