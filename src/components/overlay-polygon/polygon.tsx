import { useWindowDimensions, StyleSheet } from 'react-native';
import { Svg, Defs, Rect, Mask, Polygon } from 'react-native-svg';
import React, { FC } from 'react';
import type { TPolygon } from '../../types';

const MapPolygon: FC<TPolygon> = ({
  path,
  fillOverlay,
  widthOverlayLine,
  colorWidthOverlayLine,
  backgroundOverlayPolygon,
}) => {
  const { width, height } = useWindowDimensions();

  return (
    <Svg
      height={height}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
      style={[
        styles.container,
        {
          backgroundColor: backgroundOverlayPolygon,
        },
      ]}
    >
      <Defs>
        <Mask id="mask" x="0" y="0" height="100%" width="100%">
          <Rect height="100%" width="100%" fill="#fff" />
          <Polygon
            points={path}
            fill={fillOverlay}
            stroke={colorWidthOverlayLine}
            strokeWidth={widthOverlayLine}
          />
        </Mask>
      </Defs>
      <Rect
        height="100%"
        width="100%"
        fill="rgba(0, 0, 0, 0.7)"
        mask="url(#mask)"
        fill-opacity="0"
      />
    </Svg>
  );
};

export default MapPolygon;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 4,
  },
});
