import { Button, Dialog, DialogBody, Spinner } from '@blueprintjs/core';
import { VSRankContent } from '@yakumi-app/domain/vsRankCharacter/components/VSRankContent';
import { useVSRankCharacterPageHooks } from '@yakumi-app/hooks/vsRankCharacterPageHooks';
import { Link } from 'react-router-dom';

function VSRankCharacterPage() {
  const vm = useVSRankCharacterPageHooks();

  return (
    <div style={{ margin: '1rem' }}>
      <h1>王国立冒険者学校新入生ランク分け対人戦試験キャラクターデッキ作成</h1>
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
        <Button
          icon="floppy-disk"
          style={{ marginLeft: '5px' }}
          onClick={vm.saveCharacterHandler}
        >
          保存
        </Button>
      </div>
      <div>
        {vm.characterList && (
          <div>
            <h4>作成キャラリスト</h4>
            <ul style={{ display: 'flex', listStyle: 'none' }}>
              {vm.characterList.map((item) => (
                <li
                  key={item.id}
                  style={{
                    marginLeft: '1rem',
                    fontWeight: item.id === vm.characterId ? 'bold' : 'normal',
                    cursor: item.id === vm.characterId ? 'default' : 'pointer',
                    borderBottom:
                      item.id === vm.characterId ? 'solid 1px #fff' : 'none',
                  }}
                  onClick={() => vm.selectCharacter(item.id)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <VSRankContent vm={vm} />

      <Dialog isOpen={vm.isLoading && !vm.isSaving}>
        <DialogBody useOverflowScrollContainer={false}>
          <Spinner intent="primary" size={50} />
          <span style={{ color: '#000' }}>キャラクターシート出力中...</span>
        </DialogBody>
      </Dialog>
      <Dialog isOpen={vm.isSaving}>
        <DialogBody useOverflowScrollContainer={false}>
          <Spinner intent="primary" size={50} />
          <span style={{ color: '#000' }}>キャラクターシート保存中...</span>
        </DialogBody>
      </Dialog>
      <Dialog isOpen={vm.isSaved}>
        <DialogBody useOverflowScrollContainer={false}>
          <p style={{ color: '#000' }}>保存が完了しました。</p>
          <a
            href={`https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&button_hashtag=VSランク戦&url=${`https://${location.hostname}/app/vs-rank-character-viewer/${vm.uid}/${vm.characterId}`.replace(/\//g, '%2F').replace(':', '%3A')}&text=「 ${vm.characterName} 」 のキャラクターデッキを作成しました。 &nbsp;`}
            target="_blank"
          >
            Twitterでシェア
          </a>
          <p>
            <Link to={`/vs-rank-character-viewer/${vm.uid}/${vm.characterId}`}>
              公開用ページへ
            </Link>
          </p>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default VSRankCharacterPage;
