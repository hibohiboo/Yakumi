import React, { useCallback } from 'react';
type DOMRectProperty = keyof Omit<DOMRect, 'toJSON'>;

export const useGetElementProperty = <T extends HTMLElement>(
  elementRef: React.RefObject<T>,
) => {
  const getElementProperty = useCallback(
    (targetProperty: DOMRectProperty): number => {
      const clientRect = elementRef.current?.getBoundingClientRect();
      if (clientRect) {
        return clientRect[targetProperty];
      }

      // clientRect が undefined のときはデフォルトで0を返すようにする
      return 0;
    },
    [elementRef],
  );

  return {
    getElementProperty,
  };
};
