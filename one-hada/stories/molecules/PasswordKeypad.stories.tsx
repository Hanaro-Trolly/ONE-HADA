import PasswordKeypad from '@/components/ui/PasswordKeypad';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PasswordKeypad> = {
  title: 'Molecules/PasswordKeypad',
  component: PasswordKeypad,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PasswordKeypad>;

export const Default: Story = {
  args: {
    handleSubmit: (password, setPassword) => {
      alert(`입력된 비밀번호: ${password.join('')}`);
      // 입력 후 비밀번호 초기화
      setPassword([]);
    },
  },
};
