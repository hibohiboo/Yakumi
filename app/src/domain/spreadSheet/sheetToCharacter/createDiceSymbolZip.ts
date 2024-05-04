 
import { Settings, TextImageCard } from '@yakumi-app/domain/card/types';
import { createZip } from '@yakumi-app/domain/udonarium/common';

import { createDiceSymbol } from './udonarium/createDiceSymbol';

export const createDiceSymbolZip = async (
  refList: React.RefObject<HTMLDivElement>[],
  items: TextImageCard[],
  setting: Settings,
) => {
  const { xml, files } = await createDiceSymbol(refList, items, setting);

  await createZip([xml, ...files], setting.deckName);
};
