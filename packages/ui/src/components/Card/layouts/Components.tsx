 
import { rubyText } from '@yakumi-components/components/atoms/rubyText';
import React from 'react';
import styles from './CardWrapper.module.css';

export function CardName(props: { children: React.ReactNode }) {
  return (
    <div
      className={styles.cardName}
      dangerouslySetInnerHTML={{ __html: rubyText(props.children?.toString()) }}
    ></div>
  );
}
export function CardContent(props: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{ ...props.style }}
      className={styles.cardContent}
      dangerouslySetInnerHTML={{
        __html: rubyText(props?.children?.toString()),
      }}
    ></div>
  );
}
export function CardType(props: { children: React.ReactNode }) {
  return (
    <div className={styles.cardType}>
      <span>{props.children}</span>
    </div>
  );
}
export function CardId(props: { children: React.ReactNode }) {
  return <div className={styles.cardId}>{props.children}</div>;
}
export function CardProp(props: {
  children: React.ReactNode;
  label: string;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}) {
  return (
    <div className={styles.cardPropLabelWrapper} style={props.style}>
      <div className={styles.cardPropLabel} style={props.labelStyle}>
        {props.label}
      </div>
      <div
        className={styles.cardPropContent}
        style={props.contentStyle}
        dangerouslySetInnerHTML={{
          __html: rubyText(props.children?.toString()),
        }}
      ></div>
    </div>
  );
}
export function DivRubyText(props: {
  text: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`${styles.rubyText} ${props.className}`}
      style={props.style}
      dangerouslySetInnerHTML={{ __html: rubyText(props.text) }}
    ></div>
  );
}
