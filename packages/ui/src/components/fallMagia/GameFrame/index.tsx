import { useEffect, useRef, useState } from 'react';
import BaseWrapper from './atoms/BaseWrapper';
import styles from './index.module.css';
import { useGetElementProperty } from './useGetElementProperty';

// https://camchenry.com/blog/how-to-disable-ui-and-control-focus-with-the-inert-attribute
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  interface HTMLAttributes<T> {
    /**
     * Prevents focus from moving to any element inside this DOM element and ignores user events.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert
     */
    inert?: 'inert';
  }
}

export interface GameFrameProps {
  children?: React.ReactNode;
  onClickMessage?: () => void;
}

export function GameFrame(props: GameFrameProps) {
  const targetRef = useRef(null);
  const [scale, setScale] = useState(1);
  const { getElementProperty } =
    useGetElementProperty<HTMLDivElement>(targetRef);
  useEffect(() => {
    setScale(getElementProperty('width') / 640);
  }, []);

  return (
    <BaseWrapper ref={targetRef}>
      <div
        className={styles.container}
        style={{ transform: `scale(${scale})` }}
      >
        {props.children}
      </div>
    </BaseWrapper>
  );
}
