import { Settings } from '@yakumi-app/domain/card/types';
import { canvasToFile } from '@yakumi-app/domain/udonarium/canvas';
import { createDeck } from '@yakumi-app/domain/udonarium/udonariumZip';
import html2canvas from 'html2canvas';
import { partition } from 'lodash';
import { CharacterSheetPropsCard } from '../types';
import { createUdonariumFiles } from './createUdonariumFiles';

export const createVSRankChearacterDeck = async (
  refList: React.RefObject<HTMLDivElement>[],
  items: CharacterSheetPropsCard[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  backRef: any,
  setting: Settings,
) => {
  const back = await canvasToFile(await html2canvas(backRef.current));
  const [alwaysItems, tmpItems] = partition(items, (f) => f.timing === '常時');
  const [noBattleItems, commonItems] = partition(
    tmpItems,
    (f) => f.timing === '戦闘外',
  );
  const always = await Promise.all(
    alwaysItems.map(createUdonariumFiles(back.identifier, setting, refList)),
  );
  const common = await Promise.all(
    commonItems.map(createUdonariumFiles(back.identifier, setting, refList)),
  );
  const noBattle = await Promise.all(
    noBattleItems.map(createUdonariumFiles(back.identifier, setting, refList)),
  );

  const deck = createDeck(
    setting.deckName,
    common.map((f) => f.card),
    setting,
  );
  const deckAlways = createDeck(
    `${setting.deckName} (常時タイミング)`,
    always.map((f) => f.card),
    setting,
  );
  const deckNoBattle = createDeck(
    `${setting.deckName} (戦闘外)`,
    noBattle.map((f) => f.card),
    setting,
  );

  return {
    deck,
    back,
    files: [...always, ...common, ...noBattle],
    deckAlways,
    deckNoBattle,
  };
};
