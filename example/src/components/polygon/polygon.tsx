import React, { FC } from 'react';
import Animated from 'react-native-reanimated';
import { Polygon } from '../../../../src';
import { IAnimatedPolygon } from './types';

const ReanimatedPolygon = Animated.createAnimatedComponent(Polygon);

const AnimatedPolygon: FC<IAnimatedPolygon> = ({ coordinates }) => {
    return (
        <ReanimatedPolygon
            coordinates={coordinates}
            fillColor="rgba(255, 171, 171, 0.01)"
            strokeColor="rgba(255, 171, 171, 0.88)"
            strokeWidth={1}
        />
    );
};

export default AnimatedPolygon;
