import DOMPurify from 'dompurify';

export function rubyText(text?: string) {
  if (!text) return '';
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

  return DOMPurify.sanitize(html, { ALLOWED_TAGS: ['ruby', 'rt'] });
}
