import { Button } from '@blueprintjs/core';
import { GameFrame } from '@yakumi-components/index';
import { Link } from 'react-router-dom';
import BaseWrapper from '../../components/atoms/BaseWrapper/BaseWrapper';
import NextButton from '../../components/atoms/NextButton';
import { useUdonTurorialHooks } from '../../hooks/udonTutorialHooks';
import {
  UDONARIUM_IFRAME_ID,
  UDONARIUM_IFRAME_TUTORIAL_URL,
} from '../../services/udonarium/const';

function SceneUdonarium() {
  const vm = useUdonTurorialHooks();
  return (
    <BaseWrapper>
      <div>
        <div
          style={{
            padding: '1rem',
            height: '4rem',
          }}
        >
          {vm.msg}
        </div>
        <div
          style={{
            display: 'flex',
            marginBottom: '2rem',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ paddingLeft: '1rem' }}>
            <NextButton text="次へ" onClick={vm.nextHandler} />
          </div>
          <div>
            <div>
              <a href="/magia/" style={{ marginLeft: '2rem' }}>
                <Button>トップ</Button>
              </a>
              <Link
                to="/fall-magia/character/tutorial/main"
                style={{ marginLeft: '2rem' }}
              >
                <Button icon="person">作成ページへ</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <GameFrame>
        <iframe
          title="udonarium"
          id={UDONARIUM_IFRAME_ID}
          src={UDONARIUM_IFRAME_TUTORIAL_URL}
          allowFullScreen
          width="640"
          height="480"
        />
        <div
          style={{
            position: 'absolute',
            top: '0',
            width: '640px',
            height: '480px',
            userSelect: 'none',
            pointerEvents: 'auto',
            display: vm.isGeneratorEnd ? 'none' : 'block',
          }}
        ></div>
      </GameFrame>
    </BaseWrapper>
  );
}

export default SceneUdonarium;
