// stories/atoms/BankIcon.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import BankIcon from '../../components/molecules/BankIcon';

const meta = {
  title: 'Atoms/BankIcon',
  component: BankIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    bankId: {
      control: 'select',
      options: ['하나은행', '국민은행', '신한은행', '우리은행', '카카오뱅크'],
    },
  },
} satisfies Meta<typeof BankIcon>;

export default meta;
type Story = StoryObj<typeof BankIcon>;

export const Default: Story = {
  args: {
    bankId: '하나은행',
  },
};
