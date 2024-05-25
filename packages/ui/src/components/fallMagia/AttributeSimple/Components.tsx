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
export function CardContent(props: {
  text: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ ...props.style }} className={styles.cardContent}>
      <div
        className={styles.cardContentFlavor}
        dangerouslySetInnerHTML={{
          __html: rubyText(props.text),
        }}
      ></div>
    </div>
  );
}
export function TagArea(props: {
  tags: string[];
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ ...props.style }} className={styles.tagArea}>
      {props.tags.map((tag, i) => (
        <div key={i} className={styles.tag}>
          {tag}
        </div>
      ))}
    </div>
  );
}
