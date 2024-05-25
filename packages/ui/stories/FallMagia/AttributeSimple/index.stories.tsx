import Component from '@yakumi-components/components/fallMagia/AttributeSimple/AttributeSimpleCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'FallMagia/SimpleCard',
  args: {
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
  },
  component: Component,
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
