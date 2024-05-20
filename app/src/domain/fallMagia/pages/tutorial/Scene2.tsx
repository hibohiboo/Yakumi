import { Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import BaseWrapper from '../../components/atoms/BaseWrapper/BaseWrapper';
import { useFallMagiaScene2Hooks } from '../../hooks/scene2Hooks';

const centerStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
} as const;

function FallMagiaTutorial2() {
  const vm = useFallMagiaScene2Hooks();
  return (
    <BaseWrapper>
      <div style={centerStyle}>
        <div>
          <div style={{ whiteSpace: 'pre-wrap', padding: '2rem' }}>
            {vm.selectedQA.a}
          </div>
          <div style={{ margin: '2rem 0', ...centerStyle }}>
            <div className="bp5-html-select">
              <select defaultValue={'0'} onChange={vm.setQA}>
                {vm.scene2Questions.map((item) => (
                  <option key={item.q} value={item.q}>
                    {item.q}
                  </option>
                ))}
              </select>
              <span className="bp5-icon bp5-icon-double-caret-vertical"></span>
            </div>
          </div>
          <div style={centerStyle}>
            <Link to="/fall-magia/character/tutorial/3">
              <Button text="魔法少女になる" />
            </Link>
          </div>
          <div
            style={{ whiteSpace: 'pre-wrap', padding: '1rem', color: 'black' }}
          >
            {vm.selectedQA.b}
          </div>
        </div>
      </div>
    </BaseWrapper>
  );
}

export default FallMagiaTutorial2;
