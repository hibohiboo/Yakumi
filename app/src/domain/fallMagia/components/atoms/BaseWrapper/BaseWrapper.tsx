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
      <div className={styles.agreementAndPolicy}>
        <a href="/app/agreement">利用規約</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="/app/privacy-policy">プライバシーポリシー</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="/app/materials">利用素材</a>
      </div>
    </div>
  );
});

export default BaseWrapper;
