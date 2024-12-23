import InputField from '@/components/ui/labelInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InputField> = {
  title: 'Atoms/InputField',
  component: InputField,
  tags: ['autodocs'],
  args: {
    label: '이메일',
    type: 'text',
    inputClassName:
      'px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#61B89F]',
    labelClassName: 'mr-2 w-20 font-medium',
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {};

// type='password' 사례
export const Password: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
  },
};

// 커스텀 placeholder
export const CustomPlaceholder: Story = {
  args: {
    label: '닉네임',
    placeholder: '닉네임을 입력하세요',
  },
};
