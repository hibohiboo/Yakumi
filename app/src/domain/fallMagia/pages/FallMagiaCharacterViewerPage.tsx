import { Button } from '@blueprintjs/core';
import { SaveCharacterArgs } from '@yakumi-app/domain/vsRankCharacter/persistent/saveCharacter';
import CharacterPreviewer from '@yakumi-components/components/vsRankedMatch/CharacterPreviwer';
import { UdonariumMap } from '@yakumi-components/index';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { useFallMagiaCharacterPageHooks } from '../hooks/fallMagiaCharacterPageHooks';
import { fallMagiaItemsToCcfoliaJson } from '../services/ccfolia/convertCardToCommand';
// function toBase64Async(blob: Blob): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       resolve(reader.result as string);
//     };
//     reader.onabort = reader.onerror = () => {
//       reject();
//     };
//     reader.readAsDataURL(blob);
//   });
// }

function FallMagiaCharacterViewerPage() {
  const { data, zipUrl } = useLoaderData() as {
    data: SaveCharacterArgs;
    zipUrl: string;
  };
  const vm = useFallMagiaCharacterPageHooks();
  const [url] = useState<string | null>(null);
  // useEffect(() => {
  //   (async () => {
  //     if (!data.src) return;
  //     const res = await fetch(data.src);
  //     const blob = await res.blob();

  //     // Base64文字列を使ってData URLsを作成する
  //     const base64DataURL = await toBase64Async(blob);
  //     setUrl(base64DataURL);
  //   })();
  // }, []);

  const ccfoliaJson = fallMagiaItemsToCcfoliaJson(
    data.cards,
    data.name,
    data.props,
    `https://gentle-smoke-0024c9c00.5.azurestaticapps.net/app/fall-magia/character/viewer/${data.uid}/${data.characterId}`,
    url,
  );
  return (
    <div style={{ margin: '1rem' }}>
      <h1>魔法少女フォールマギア</h1>
      <div>
        {data.uid === vm.uid && (
          <Link to="/fall-magia/character/tutorial/main">
            <Button icon="edit">編集</Button>
          </Link>
        )}
      </div>
      <div>
        <a
          href="https://scrapbox.io/fall-magia/%E3%83%AB%E3%83%BC%E3%83%AB"
          target="_blank"
          style={{ color: '#0f0' }}
        >
          ゲームのルール（アルファ版）
        </a>
        <Button
          icon="download"
          style={{ marginLeft: '5px' }}
          onClick={vm.downloadMap}
        >
          マップDL
        </Button>
        <a href={zipUrl}>
          <Button icon="download" style={{ marginLeft: '5px' }}>
            ユドナリウム用ZipDL
          </Button>
        </a>

        <a
          href="/udonarium/?room=vsrank"
          target="_blank"
          style={{ color: '#fff', marginLeft: '5px' }}
        >
          ユドナリウム
        </a>
      </div>
      <details style={{ margin: '10px' }}>
        <summary>ココフォリア用 JSON</summary>
        <div>
          <input value={JSON.stringify(ccfoliaJson)} readOnly />
          <button
            onClick={() => {
              if (navigator.clipboard)
                navigator.clipboard.writeText(JSON.stringify(ccfoliaJson));
            }}
          >
            クリップボードにcopy
          </button>
          <p>
            ※ココフォリア用JSONはクリップボードにコピー後、ココフォリアのルームで貼り付けてください
          </p>
        </div>
      </details>
      <div>
        <CharacterPreviewer {...data} />
      </div>
      <details>
        <summary>マップ</summary>
        <div
          ref={vm.mapRef}
          style={{ background: 'white', width: 'fit-content' }}
        >
          <UdonariumMap />
        </div>
      </details>
      <div>
        <a href="/app/agreement" style={{ color: 'gray' }}>
          利用規約
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="/app/privacy-policy" style={{ color: 'gray' }}>
          プライバシーポリシー
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="/app/materials" style={{ color: 'gray' }}>
          利用素材
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="/magia/" target="_blank" style={{ color: 'gray' }}>
          トップへ
        </a>
      </div>
    </div>
  );
}

export default FallMagiaCharacterViewerPage;
