import Component from '@yakumi-components/components/fallMagia/CharacterPreviwer';
import data from './data.json';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'FallMagia/CharacterPreviewer',
  args: data,
  component: Component,
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
