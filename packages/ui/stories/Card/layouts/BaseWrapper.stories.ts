import CardWrapper from '@yakumi-components/components/Card/layouts/CardWrapper';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Card/layouts/CardWrapper',
  component: CardWrapper,
  args: { children: '' },
  tags: ['autodocs'], // ドキュメント自動生成
} satisfies Meta<typeof CardWrapper>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
