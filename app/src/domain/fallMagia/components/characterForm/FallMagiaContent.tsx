import { CharacterPreviewer } from '@yakumi-components/index';
import { FallMagiaCharacterPageViewModel } from '../../hooks/fallMagiaCharacterPageHooks';
import FallMagiaCharacterForm from './FallMagiaCharacterForm';
import styles from './FallMagiaCharacterForm.module.css';

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
        <CharacterPreviewer
          {...{
            name: vm.characterName,
            src:
              vm.characterSrc.includes('outline_person_outline_black_24dp') &&
              vm.characterSavedSrc
                ? vm.characterSavedSrc
                : vm.characterSrc,
            cards: vm.selectedItems,
            props: vm.params,
            extraTags: vm.selectedExtraTags,
            memo: vm.characterMemo,
          }}
        />
      </div>
    </div>
  );
}
