import Component from '@yakumi-components/components/fallMagia/Attribute/AttributeCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'FallMagia/AttributeCard',
  component: Component,
  args: {
    name: '一般射撃魔法《シュート》',
    timing: '常時',
    cp: 5,
    countdown: '5',
    range: '3',
    cost: 'MP5',
    target: '単体',
    content: `5ダメージ`,
    flavor: `「魔法はイメージで使うの。撃つんじゃない、当たるイメージ」
      ──"皆中時計" クロックショット`,
    id: 'id-4',
    tags: ['攻撃', '射撃'],
    type: '特徴',
  },
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Image: Story = {
  args: {
    src: 'https://lostrpg-751c1.firebaseapp.com/assets/images/monster/debudori.png',
  },
};
export const Selected: Story = {
  args: {
    selected: true,
  },
};
export const LongString: Story = {
  args: {
    selected: true,
    name: '|鬼道の八 雷神の系譜 神の雷《ケラウノス》',
  },
};
