import Component from '@yakumi-components/components/vsRankedMatch/UdonariumMap';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'RankedMatch/UdonariumMap',
  args: {},
  component: Component,
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
