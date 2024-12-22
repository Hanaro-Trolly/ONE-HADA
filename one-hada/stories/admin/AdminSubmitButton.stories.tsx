import AdminSubmitButton from '@/components/admin/AdminSubmitButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AdminSubmitButton> = {
  component: AdminSubmitButton,
  title: 'Admin/AdminSubmitButton',
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof AdminSubmitButton>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Button clicked'),
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    onClick: () => console.log('Button clicked'),
    disabled: true,
  },
};

export const CustomStyle: Story = {
  args: {
    onClick: () => console.log('Button clicked'),
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className='p-4 bg-gray-100'>
        <Story />
      </div>
    ),
  ],
};
