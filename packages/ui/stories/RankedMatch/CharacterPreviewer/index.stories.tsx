import Component from '@yakumi-components/components/vsRankedMatch/CharacterPreviwer';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'RankedMatch/CharacterPreviewer',
  args: {
    name: 'さくら',
    src: 'https://lostrpg-751c1.firebaseapp.com/assets/images/monster/debudori.png',
    props: [
      {
        items: [
          {
            name: 'HP',
            sheetPropsResourceType: 'numberResource',
            value: '30',
            currentValue: 10,
          },
          {
            name: 'mp',
            sheetPropsResourceType: 'numberResource',
            value: '10',
            currentValue: 10,
          },
        ],
        name: 'リソース',
      },
    ],
    cards: [
      {
        name: '辺境育ち',
        timing: '常時',
        cp: 10,
        countdown: '-',
        range: '-',
        cost: 'なし',
        content: `HP+5。`,
        flavor:
          '辺境の地で生まれ育った者は、どんな状況でも生き抜く力を持っている。',
        id: '',
        tags: ['HP', 'リソース'],
        type: '特徴',
        sheetPropsName: '',
        sheetPropsValue: '',
        count: 0,
        sheetPropsResourceName: '',
      },
    ],
    extraTags: [],
  },
  component: Component,
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
