import React from 'react';
import styles from './CardWrapper.module.css';

export default function CardWrapper(props: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  selected?: boolean;
}) {
  return (
    <div
      style={props.style}
      className={`${styles.card} ${props.selected ? styles.cardSelected : ''}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
