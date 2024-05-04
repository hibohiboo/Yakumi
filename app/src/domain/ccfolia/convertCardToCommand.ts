import { TextImageCard } from '../card/types';
import { CharacterClipboardData } from './types';

export const itemsToCcfoliaJson = (
  items: TextImageCard[],
  name: string,
  id: string,
  sheet: string,
): CharacterClipboardData => {
  return {
    kind: 'character',
    data: {
      name: name,
      externalUrl: `https://gentle-smoke-0024c9c00.5.azurestaticapps.net/app/spread-sheet/?id=${id}&sheet=${sheet}`,
      params: [
        ...items.map((p, i) => ({
          label: `${i + 1}:${p.name}`,
          value: `『${p.name}』 ${p.content}`,
        })),
      ],
      commands: `${items.map((p, i) => `{${i + 1}:${p.name}}`).join('\n')}`,
    },
  };
};
