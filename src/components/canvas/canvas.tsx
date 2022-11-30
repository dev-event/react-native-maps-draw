import Svg, { Polyline } from 'react-native-svg';
import type { TCanvas } from '../../types';
import React, { FC } from 'react';

const Canvas: FC<TCanvas> = ({
  path,
  colorLine,
  widthLine,
  fillColorCanvas,
  containerSize,
}) => {
  return (
    <Svg
      height="100%"
      width="100%"
      viewBox={`0 0 ${containerSize?.width} ${containerSize?.height}`}
    >
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
