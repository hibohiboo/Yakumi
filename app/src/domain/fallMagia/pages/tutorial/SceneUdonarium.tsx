import { Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import BaseWrapper from '../../components/atoms/BaseWrapper/BaseWrapper';
import NextButton from '../../components/atoms/NextButton';
import { useUdonTurorialHooks } from '../../hooks/udonTutorialHooks';
import {
  UDONARIUM_IFRAME_ID,
  UDONARIUM_IFRAME_TUTORIAL_URL,
} from '../../services/udonarium/const';

const centerStyle = {
  width: '100%',
  height: '80vh',
  position: 'relative',
  justifyContent: 'center',
  overflow: 'auto',
} as const;

function SceneUdonarium() {
  const vm = useUdonTurorialHooks();
  return (
    <BaseWrapper>
      <div style={centerStyle}>
        <div style={{ padding: '1rem' }}>{vm.msg}</div>
        <div style={{ paddingLeft: '1rem' }}>
          <NextButton text="次へ" onClick={vm.nextHandler} />
          <a href="/magia/" style={{ marginLeft: '2rem' }}>
            <Button>トップページへ</Button>
          </a>
          <Link
            to="/fall-magia/character/tutorial/main"
            style={{ marginLeft: '2rem' }}
          >
            <Button>キャラクターデッキ作成ページへ</Button>
          </Link>
        </div>
        <iframe
          title="udonarium"
          id={UDONARIUM_IFRAME_ID}
          src={UDONARIUM_IFRAME_TUTORIAL_URL}
          allowFullScreen
          width="640"
          height="480"
          style={{
            position: 'absolute',
            top: 110,
            left: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 100,
            left: 0,
            width: '100%',
            height: '100%',
            userSelect: 'none',
            pointerEvents: 'auto',
            display: vm.isGeneratorEnd ? 'none' : 'block',
          }}
        ></div>
      </div>
    </BaseWrapper>
  );
}

export default SceneUdonarium;
