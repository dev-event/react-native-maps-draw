import type { IPathProps } from '../types';

export interface IPolygonProps extends IPathProps {
  fillOverlay?: string;
  widthOverlayLine?: number;
  colorWidthOverlayLine?: string;
  backgroundOverlayPolygon?: string;
}
