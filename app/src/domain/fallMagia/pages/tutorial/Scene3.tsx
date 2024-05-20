import { Button } from '@blueprintjs/core';
import { useAppDispatch, useAppSelector } from '@yakumi-app/store/hooks';
import { ChangeEventHandler } from 'react';
import { Link } from 'react-router-dom';
import BaseWrapper from '../../components/atoms/BaseWrapper/BaseWrapper';
import {
  characterNameSelector,
  setCharacterName,
} from '../../store/slices/fallMagiaCharacterSlice';

const centerStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
} as const;

function FallMagiaTutorial3() {
  const dispatch = useAppDispatch();
  const cname = useAppSelector(characterNameSelector);
  const handler: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setCharacterName(e.target.value));
  };
  return (
    <BaseWrapper>
      <div style={centerStyle}>
        <div>
          <div style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}>
            {`


「まずはキミの魔法少女としての名を決めようか。後から変更もできるよ」

`}
          </div>
          <div style={{ ...centerStyle, marginBottom: '1rem' }}>
            <input
              type="text"
              className="bp5-input"
              value={cname}
              onChange={handler}
            />
          </div>
          <div style={centerStyle}>
            <Link to="/fall-magia/character/tutorial/4">
              <Button text="次へ" />
            </Link>
          </div>
          <div
            style={{ whiteSpace: 'pre-wrap', padding: '1rem', color: 'black' }}
          >
            {`
名前はランダムで生成されます。

`}
          </div>
        </div>
      </div>
    </BaseWrapper>
  );
}

export default FallMagiaTutorial3;
