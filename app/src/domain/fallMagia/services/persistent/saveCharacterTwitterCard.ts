const SERVICE_NAME = '魔法少女フォールマギア';

interface Args {
  url: string;
  title: string;
  description: string;
  src: string;
}
export const createCharacterTwitterCard = ({
  url,
  title,
  description,
  src,
}: Args) =>
  `
<!doctype html>
<html lang="ja">
  <head prefix="og: http://ogp.me/ns#">
    <meta charset="UTF-8" />
    <title>${title}｜${SERVICE_NAME}</title>
    <meta name="description" content="${description}" />
    <meta name="author" content="hibohiboo">
    <meta name="keywords" content="TRPG,${SERVICE_NAME},キャラクターシート" />
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:site_name" content="${SERVICE_NAME}">
    <meta property="og:title" content="${title}｜${SERVICE_NAME}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${src}" />
    <meta property="og:url" content="${url}" />
    <meta name="x:card" content="summary_large_image" />
    <meta name="x:site" content="@hibohiboo" />
    <meta name="x:creator" content="@hibohiboo" />
    <meta name="x:image:alt" content="${title}｜${SERVICE_NAME}">
    <meta http-equiv="Refresh" content="0; URL=${url}" />
  </head>
  <body></body>
</html>
  `;
