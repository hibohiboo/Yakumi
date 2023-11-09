import React from 'react';
import styles from './CardWrapper.module.css';
import sanitizeHtml from 'sanitize-html';

export function rubyText(text?: string) {
  if (!text) return text;
  const html = text
    .replace(/[|｜](.+?)《(.+?)》/g, '<ruby>$1<rt>$2</rt></ruby>')
    .replace(/[|｜](.+?)（(.+?)）/g, '<ruby>$1<rt>$2</rt></ruby>')
    .replace(/[|｜](.+?)\((.+?)\)/g, '<ruby>$1<rt>$2</rt></ruby>')
    /* 漢字の連続の後に括弧が存在した場合、一連の漢字をベーステキスト、括弧内の文字をルビテキストとします。 */
    .replace(/([一-龠]+)《(.+?)》/g, '<ruby>$1<rt>$2</rt></ruby>')
    /* ただし丸括弧内の文字はひらがなかカタカナのみを指定できます。 */
    .replace(/([一-龠]+)（([ぁ-んァ-ヶ]+?)）/g, '<ruby>$1<rt>$2</rt></ruby>')
    .replace(/([一-龠]+)\(([ぁ-んァ-ヶ]+?)\)/g, '<ruby>$1<rt>$2</rt></ruby>')
    /* 括弧を括弧のまま表示したい場合は、括弧の直前に縦棒を入力します。 */
    .replace(/[|｜]《(.+?)》/g, '《$1》')
    .replace(/[|｜]（(.+?)）/g, '（$1）')
    .replace(/[|｜]\((.+?)\)/g, '($1)');

  return sanitizeHtml(html, { allowedTags: ['ruby', 'rt'] });
}
export function CardName(props: { children: React.ReactNode }) {
  return (
    <div
      className={styles.cardName}
      dangerouslySetInnerHTML={{ __html: rubyText(props.children.toString()) }}
    ></div>
  );
}
export function CardContent(props: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{ ...props.style }}
      className={styles.cardContent}
      dangerouslySetInnerHTML={{ __html: rubyText(props?.children?.toString()) }}
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
        dangerouslySetInnerHTML={{ __html: rubyText(props.children?.toString()) }}
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
