import { Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import BaseWrapper from '../../components/atoms/BaseWrapper/BaseWrapper';
import { Factions } from '../../components/molecules/Factions';
import { useFallMagiaScene4Hooks } from '../../hooks/scene4Hooks';

const centerStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
} as const;

function FallMagiaTutorial4() {
  const vm = useFallMagiaScene4Hooks();
  return (
    <BaseWrapper>
      <div style={centerStyle}>
        <div>
          <div style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}>
            {`

「所属する魔法界を選んでほしい」

`}
          </div>
          <Factions
            style={{ ...centerStyle, marginBottom: '1rem' }}
            items={vm.scene4SelectItems}
            selectedItem={vm.selectedItem}
            setItem={vm.setItem}
          />
          <div
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              userSelect: 'none',
            }}
          >
            {vm.selectedItem?.label}
          </div>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '1.5rem',
              marginTop: '0.5rem',
              userSelect: 'none',
            }}
          >
            {vm.selectedItem?.description}
          </div>
          <div style={centerStyle}>
            <Link to="/fall-magia/character/tutorial/5">
              <Button text="次へ" />
            </Link>
          </div>
          <div
            style={{ whiteSpace: 'pre-wrap', padding: '1rem', color: 'black' }}
          >
            {vm.selectedItem?.b}
          </div>
        </div>
      </div>
    </BaseWrapper>
  );
}

export default FallMagiaTutorial4;
