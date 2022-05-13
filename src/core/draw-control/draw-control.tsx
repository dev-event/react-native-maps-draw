import React, { FC } from 'react';
import GestureHandler from './gesture-responder';
import type { IGestureControlProps } from '../types';
import Canvas, { ICanvasProps } from '../../canvas';

export type IDrawControl = IGestureControlProps & ICanvasProps;

const DrawControl: FC<IDrawControl> = ({
    path,
    widthLine,
    colorLine,
    containerSize,
    fillColorCanvas,
    onEndTouchEvents,
    onStartTouchEvents,
    onChangeTouchEvents,
    ...rest
}) => {
    return (
        <>
            <GestureHandler
                onEndTouchEvents={onEndTouchEvents}
                onStartTouchEvents={onStartTouchEvents}
                onChangeTouchEvents={onChangeTouchEvents}
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

export { DrawControl };
