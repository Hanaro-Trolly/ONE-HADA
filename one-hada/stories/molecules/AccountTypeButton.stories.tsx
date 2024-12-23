import AccountTypeButton from '@/components/molecules/AccountTypeButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AccountTypeButton> = {
  title: 'Molecules/AccountTypeButton',
  component: AccountTypeButton,
  tags: ['autodocs'],
  args: {
    account_type: '입출금',
    isSelected: false,
  },
};
export default meta;

type Story = StoryObj<typeof AccountTypeButton>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};

export const Clickable: Story = {
  args: {
    onClick: () => alert('AccountTypeButton 클릭!'),
  },
};
