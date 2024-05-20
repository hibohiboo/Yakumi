import { Button, Dialog, DialogBody, Spinner } from '@blueprintjs/core';
import { useFallMagiaCharacterPageHooks } from '@yakumi-app/domain/fallMagia/hooks/fallMagiaCharacterPageHooks';
import { Link } from 'react-router-dom';
import { FallMagiaContent } from '../../components/characterForm/FallMagiaContent';

function FallMagiaTutorialMain() {
  const vm = useFallMagiaCharacterPageHooks();
  return (
    <div style={{ margin: '1rem' }}>
      <h1>フォールマギアキャラクターデッキ作成</h1>
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
        <Button
          icon="floppy-disk"
          style={{ marginLeft: '5px' }}
          onClick={vm.saveCharacterHandler}
        >
          保存
        </Button>
      </div>

      <FallMagiaContent vm={vm} />

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
            href={`https://twitter.com/intent/tweet?button_hashtag=魔法少女フォールマギア&ref_src=twsrc%5Etfw&url=${`https://${location.hostname}/app/fall-magia/character/viewer/${vm.uid}/${vm.characterId}`.replace(/\//g, '%2F').replace(':', '%3A')}&text=魔法少女「 ${vm.characterName} 」 を作成しました。 &nbsp;`}
            target="_blank"
          >
            Twitterでシェア
          </a>
          <p>
            <Link
              to={`/fall-magia/character/viewer/${vm.uid}/${vm.characterId}`}
            >
              公開用ページへ
            </Link>
          </p>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default FallMagiaTutorialMain;
