import BankSelector from '@/components/ui/BankSelector';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BankSelector> = {
  title: 'Molecules/BankSelector',
  component: BankSelector,
  tags: ['autodocs'],
  args: {
    selectedBank: '',
  },
};
export default meta;

type Story = StoryObj<typeof BankSelector>;

export const Default: Story = {
  args: {
    onSelect: (bank) => alert(`${bank}을(를) 선택하셨습니다.`),
  },
};

export const WithPreset: Story = {
  args: {
    selectedBank: '국민은행',
  },
};
