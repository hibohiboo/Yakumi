import { TextImageCard } from '../card/types';
import { CharacterClipboardData } from './types';

export const itemsToCcfoliaJson = (
  items: Pick<TextImageCard, 'name' | 'content'>[],
  name: string,
  externalUrl: string,
  iconUrl: string | null = null,
): CharacterClipboardData => {
  return {
    kind: 'character',
    data: {
      name: name,
      externalUrl,
      iconUrl,
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
