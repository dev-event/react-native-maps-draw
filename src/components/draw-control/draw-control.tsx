import React, { FC } from 'react';
import type { TCanvas, TGestureControl } from '../../types';
import GestureHandler from './gesture-responder';
import Canvas from '../canvas';

export type IDrawControl = TGestureControl & TCanvas;

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

export default DrawControl;
