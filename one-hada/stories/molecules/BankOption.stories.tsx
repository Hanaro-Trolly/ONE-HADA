import BankOption from '@/components/molecules/BankOption';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BankOption> = {
  title: 'Molecules/BankOption',
  component: BankOption,
  tags: ['autodocs'],
  args: {
    bankName: '하나은행',
    selected: false,
  },
};
export default meta;

type Story = StoryObj<typeof BankOption>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

// 여러 은행 옵션을 한 번에 테스트
export const MultipleOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <BankOption bankName='하나은행' selected={false} onClick={() => {}} />
      <BankOption bankName='국민은행' selected={true} onClick={() => {}} />
      <BankOption bankName='신한은행' selected={false} onClick={() => {}} />
    </div>
  ),
};
