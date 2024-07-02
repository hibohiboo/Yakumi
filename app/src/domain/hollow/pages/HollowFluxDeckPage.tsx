import { Button, Dialog, DialogBody } from '@blueprintjs/core';
import React from 'react';
import { HollowInputArea } from '../components/HollowInputArea';
import { HollowRule } from '../components/HollowRule';
import { HollowSelectedCards } from '../components/HollowSelectedCards';
import { useHollow } from '../hooks/useHollow';
import { getHollowImageSrc } from '../image/getHollowImageSrc';

function HollowFluxDeckPage() {
  const vm = useHollow();
  return (
    <div style={{ padding: '1rem' }}>
      <h1> HollowΦFluxデッキ作成</h1>
      <div>
        <Button icon="download" onClick={vm.downloadUdonarium}>
          ユドナリウム用デッキzipダウンロード
        </Button>
        <Button style={{ marginLeft: '2rem' }} onClick={vm.clearStorage}>
          デッキ初期化
        </Button>
      </div>
      <div style={{ padding: '1rem' }}>
        <HollowRule />
      </div>
      <div>
        <HollowSelectedCards vm={vm} target="deck" />
      </div>
      <div>
        <HollowSelectedCards vm={vm} target="guard" />
      </div>
      <div>
        <div>
          <span title="デッキ">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D&nbsp;&nbsp;&nbsp;
          </span>
          <span title="ガードデッキ">
            &nbsp; &nbsp;&nbsp;G&nbsp; &nbsp;&nbsp;
          </span>
        </div>
        <HollowInputArea vm={vm} />
      </div>
      <Dialog isOpen={vm.isModelShow} onClose={vm.handleClose}>
        <DialogBody useOverflowScrollContainer={true}>
          <img
            src={getHollowImageSrc(
              `/assets/images/hollowFlux/cards/${vm.clickedCardName}.png`,
            )}
            width={350}
            style={{ margin: '0 auto' }}
            alt={vm.clickedCardName}
          />
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default HollowFluxDeckPage;
