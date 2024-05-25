import { Link } from 'react-router-dom';
import BaseWrapper from '../../components/atoms/BaseWrapper/BaseWrapper';
import NextButton from '../../components/atoms/NextButton';

const centerStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
} as const;

function FallMagiaTutorial1Prologue() {
  return (
    <BaseWrapper>
      <div style={centerStyle}>
        <div>
          <div style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}>
            {`
「ねえ、そこのキミ。そう、アナタ」



          「――魔法少女にならないかい？」          


`}
          </div>

          <div style={centerStyle}>
            <Link to="/fall-magia/character/tutorial/2">
              <NextButton text="話を聞く" />
            </Link>
          </div>
          <div
            style={{ whiteSpace: 'pre-wrap', padding: '1rem', color: 'black' }}
          >
            {`
夕暮れの帰り道、突然の声に振り返る。
そこには見知らぬ小動物のようなぬいぐるみが浮いている。



魔法少女候補との出会いのシーンです。

周囲に人がいない状況で、時を止める魔法を行使したうえで営業を行います。
担当は魔法少女計画事業創造本部の営業が務めます。

`}
          </div>
        </div>
      </div>
    </BaseWrapper>
  );
}

export default FallMagiaTutorial1Prologue;
