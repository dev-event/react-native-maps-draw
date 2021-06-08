import { useWindowDimensions } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import type { TouchPoint } from '../types';
import React, { FC, useMemo } from 'react';

interface CanvasProps {
  path: TouchPoint[];
  color?: string;
  widthLine?: number;
}

const Canvas: FC<CanvasProps> = ({ path, color, widthLine }) => {
  const { width, height } = useWindowDimensions();
  const points = useMemo(
    () =>
      path.map((item: TouchPoint) => `${item.x - 10},${item.y + 40}`).join(' '),
    [path]
  );

  return (
    <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
      <Polyline
        fill="none"
        stroke={color}
        points={points}
        strokeWidth={widthLine}
      />
    </Svg>
  );
};

export { Canvas };
