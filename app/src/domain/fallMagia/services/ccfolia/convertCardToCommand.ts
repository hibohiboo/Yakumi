import {
  CharacterSheetDetailsProp,
  CharacterSheetPropsCard,
} from '@yakumi-components/components/vsRankedMatch/CharacterPreviwer/types';
import { CharacterClipboardData } from './types';

export const fallMagiaItemsToCcfoliaJson = (
  items: CharacterSheetPropsCard[],
  name: string,
  props: CharacterSheetDetailsProp[],
  externalUrl: string,
  iconUrl: string | null = null,
): CharacterClipboardData => {
  return {
    kind: 'character',
    data: {
      name: name,
      externalUrl,
      iconUrl,
      status: props
        .flatMap((p) => p.items)
        .map((p) => ({
          label: p.name,
          value: Number(p.currentValue),
          max: Number(p.value),
        })),
      params: [
        ...items.map((p, i) => ({
          label: `${i + 1}:${p.name}`,
          value: `『${p.name}』 効果: ${p.content} | CT:${p.count} | コスト:${p.cost}| タイミング: ${p.timing} | 射程: ${p.range} | タグ: ${p.tags} `,
        })),
      ],
      commands: `${items.map((p, i) => `{${i + 1}:${p.name}}`).join('\n')}`,
    },
  };
};
