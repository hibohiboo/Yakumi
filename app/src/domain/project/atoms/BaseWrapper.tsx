import React, { forwardRef } from 'react';
import styles from './BaseWrapper.module.css';

const BaseWrapper = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
  }
>((props, ref) => {
  return (
    <div className={styles.container}>
      <div className={styles.main} ref={ref}>
        {props.children}
      </div>
    </div>
  );
});

export default BaseWrapper;
