import { useMemo } from 'react';
import invariant from 'invariant';
import type { TMap } from '../../types';

const useValidator = ({ points, onChangePoints }: TMap) => {
  useMemo(() => {
    invariant(
      points instanceof Array,
      `'points' was provided but with wrong type ! expected type is a points[{  x: number; y: number},...].`
    );

    invariant(
      typeof onChangePoints === 'function',
      `'onChangePoints' was provided but with wrong type ! expected type is a function.`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useValidator;
