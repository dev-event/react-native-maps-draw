import { IPathProps } from '../types';
export interface IContainerSize {
    width: number;
    height: number;
}


export interface ICanvasProps extends IPathProps {
    colorLine?: string;
    widthLine?: number;
    containerSize: IContainerSize;
    fillColorCanvas?: string;
}
