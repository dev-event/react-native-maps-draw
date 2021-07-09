import React, { FC } from 'react';
import Animated from 'react-native-reanimated';
import { Polygon } from '../../../../src';
import { IAnimatedPolygon } from './types';

const ReanimatedPolygon = Animated.createAnimatedComponent(Polygon);

const AnimatedPolygon: FC<IAnimatedPolygon> = ({ coordinates }) => {
  return (
    <ReanimatedPolygon
      coordinates={coordinates}
      fillColor="rgba(100, 31, 118, 0.02)"
      strokeColor="rgba(100, 31, 118, 0.15)"
      strokeWidth={1}
    />
  );
};

export default AnimatedPolygon;
