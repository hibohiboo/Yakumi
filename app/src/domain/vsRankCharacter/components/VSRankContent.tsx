import { UseVSRankCharacterPageViewModel } from '@yakumi-app/hooks/vsRankCharacterPageHooks';
import { CharacterPreviewer } from '@yakumi-components/index';
import VSRankCharacterForm from './VSRankCharacterForm';
import styles from './VSRankContent.module.css';

export function VSRankContent({ vm }: { vm: UseVSRankCharacterPageViewModel }) {
  return (
    <div className={styles.wrapper}>
      <div>
        <VSRankCharacterForm vm={vm} />
      </div>
      <div>
        <CharacterPreviewer
          {...{
            name: vm.characterName,
            src: vm.characterSrc,
            cards: vm.selectedItems,
            props: vm.params,
            extraTags: vm.selectedExtraTags,
          }}
        />
      </div>
    </div>
  );
}
