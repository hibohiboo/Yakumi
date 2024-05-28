import { FallMagiaCharacterPreviewer } from '@yakumi-components/index';
import { FallMagiaCharacterPageViewModel } from '../../hooks/fallMagiaCharacterPageHooks';
import FallMagiaCharacterForm from './FallMagiaCharacterForm';
import styles from './FallMagiaCharacterForm.module.css';

function getSrc(characterSrc?: string, characterSavedSrc?: string) {
  if (characterSrc?.includes('blob')) {
    return characterSrc;
  }
  if (characterSavedSrc) {
    return characterSavedSrc;
  }
  return characterSrc || '';
}

export function FallMagiaContent({
  vm,
}: {
  vm: FallMagiaCharacterPageViewModel;
}) {
  return (
    <div className={styles.wrapper}>
      <div style={{ maxWidth: '640px' }}>
        <FallMagiaCharacterForm vm={vm} />
      </div>
      <div>
        <FallMagiaCharacterPreviewer
          {...{
            name: vm.characterName,
            src: getSrc(vm.characterSrc, vm.characterSavedSrc),
            cards: vm.selectedItems,
            props: vm.params,
            extraTags: vm.selectedExtraTags,
            memo: vm.characterMemo,
            faction: vm.characterFaction?.tag || '幻獣界',
          }}
        />
      </div>
    </div>
  );
}
