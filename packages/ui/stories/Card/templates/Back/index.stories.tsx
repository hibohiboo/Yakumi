import Component from '@yakumi-components/components/Card/templates/Back/BackCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Card/Back',
  component: Component,
  args: {
    url: 'https://lostrpg-751c1.firebaseapp.com/assets/images/monster/debudori.png',
  },
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
