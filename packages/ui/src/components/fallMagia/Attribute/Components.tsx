import { rubyText } from '@yakumi-components/components/atoms/rubyText';
import React from 'react';
import styles from './CardWrapper.module.css';

export function CardCP(props: { children: React.ReactNode }) {
  return <div className={styles.cardCP}>{props.children}</div>;
}
const regex = /<ruby>(.*?)<rt>/;
export function CardName(props: { children: React.ReactNode }) {
  const text = rubyText(props.children?.toString());
  const match = text.match(regex);
  const name = match ? match[1] : text;
  const style = name.length > 11 ? { fontSize: '0.8rem' } : {};
  return (
    <div
      className={styles.cardName}
      style={style}
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
}
export function CardContent(props: {
  content: string;
  flavor: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ ...props.style }} className={styles.cardContent}>
      <div
        dangerouslySetInnerHTML={{
          __html: rubyText(props.content),
        }}
      ></div>
      <div
        className={styles.cardContentFlavor}
        dangerouslySetInnerHTML={{
          __html: rubyText(props.flavor),
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
