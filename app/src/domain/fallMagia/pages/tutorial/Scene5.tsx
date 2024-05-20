import { Button } from '@blueprintjs/core';
import { FallMagiaAttributeCardDescription } from '@yakumi-components/index';
import { Link } from 'react-router-dom';
import BaseWrapper from '../../components/atoms/BaseWrapper/BaseWrapper';

const centerStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
} as const;

function FallMagiaTutorial5() {
  return (
    <BaseWrapper>
      <div style={centerStyle}>
        <div>
          <div
            style={{
              whiteSpace: 'pre-wrap',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            {`

「これからキミが使える魔法を選んでもらう」

「今回のトーナメントでのCPは合計50以内のレギュレーションだ」

「変身前と変身後の変化が大きいギャップがあるとCPを抑えることができる」

「これもレギュレーションで今回は-50までと決めさせてもらうよ」
`}
          </div>
          <div style={centerStyle}>
            <Link to="/fall-magia/character/tutorial/6">
              <Button text="魔法を選ぶ" />
            </Link>
          </div>
          <div
            style={{ ...centerStyle, marginBottom: '1rem', marginTop: '1rem' }}
          >
            <div style={{ color: '#000', backgroundColor: '#eee' }}>
              <FallMagiaAttributeCardDescription />
            </div>
          </div>

          <div
            style={{ whiteSpace: 'pre-wrap', padding: '1rem', color: 'black' }}
          >
            逆に言えば。
            トーナメントに参加する気がないなら、50CP以上の魔法を選んでもいいし、-50以上のギャップを選んでもいい。
            その魔法を使ってどうするかは、事業創造本部は感知しない。
            魔法を使えば使うほど感情エネルギーが生まれるのだから。
            それはトーナメントでなくてもかまわない。
          </div>
        </div>
      </div>
    </BaseWrapper>
  );
}

export default FallMagiaTutorial5;
