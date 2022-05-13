import React, { FC } from 'react';
import GestureHandler from './gesture-responder';
import type { IGestureControlShapeProps } from '../types';
import Canvas, { ICanvasProps } from '../../canvas';

export type IDrawControlShape = IGestureControlShapeProps & ICanvasProps;

const DrawControlShape: FC<IDrawControlShape> = ({
    path,
    widthLine,
    colorLine,
    containerSize,
    fillColorCanvas,
    onEndTouchEvents,
    onStartTouchEvents,
    ...rest
}) => {
    return (
        <>
            <GestureHandler
                onEndTouchEvents={onEndTouchEvents}
                onStartTouchEvents={onStartTouchEvents}
            />

            <Canvas
                path={path}
                widthLine={widthLine}
                colorLine={colorLine}
                containerSize={containerSize}
                fillColorCanvas={fillColorCanvas}
                {...rest}
            />
        </>
    );
};

export { DrawControlShape };
