import Component from '@yakumi-components/components/Card/templates/Attribute/AttributeCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Card/Base',
  component: Component,
  args: {
    name: '① 尻(しり)が光《ひか》る(真)',
    content: `②
    尻からまばゆい光を発する。
    うろん妖力。複数使用可能。`,
    id: '③p01',
    type: '妖力',
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
