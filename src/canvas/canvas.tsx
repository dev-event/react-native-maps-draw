import { useWindowDimensions } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import type { ICanvasProps } from './types';
import React, { FC } from 'react';

const Canvas: FC<ICanvasProps> = ({ path, colorLine, widthLine, fillColorCanvas }) => {
  const { width, height } = useWindowDimensions();
  return (
    <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
      <Polyline
        fill={fillColorCanvas}
        stroke={colorLine}
        points={path}
        strokeWidth={widthLine}
      />
    </Svg>
  );
};

export default Canvas;
