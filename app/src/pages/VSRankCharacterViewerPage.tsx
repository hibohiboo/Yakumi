import { Button } from '@blueprintjs/core';
import { SaveCharacterArgs } from '@yakumi-app/domain/vsRankCharacter/persistent/saveCharacter';
import { useVSRankCharacterPageHooks } from '@yakumi-app/hooks/vsRankCharacterPageHooks';
import CharacterPreviewer from '@yakumi-components/components/vsRankedMatch/CharacterPreviwer';
import { UdonariumMap } from '@yakumi-components/index';
import { useLoaderData } from 'react-router-dom';

function VSRankCharacterViewerPage() {
  const { data, zipUrl } = useLoaderData() as {
    data: SaveCharacterArgs;
    zipUrl: string;
  };
  const vm = useVSRankCharacterPageHooks();
  return (
    <div style={{ margin: '1rem' }}>
      <h1>王国立冒険者学校新入生ランク分け対人戦試験キャラクターシート</h1>
      <div>
        <a
          href="https://scrapbox.io/VSRank/%E3%83%AB%E3%83%BC%E3%83%AB"
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
      </div>
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
    </div>
  );
}

export default VSRankCharacterViewerPage;
