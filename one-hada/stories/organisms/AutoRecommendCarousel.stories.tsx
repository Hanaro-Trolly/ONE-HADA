import AutoRecommendCarousel from '@/components/home/AutoRecommendCarousel';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AutoRecommendCarousel> = {
  title: 'Organisms/AutoRecommendCarousel',
  component: AutoRecommendCarousel,
  tags: ['autodocs'],
  args: {
    recommendProductList: ['productLoan0', 'productCard1', 'productLoan2'],
  },
};
export default meta;

type Story = StoryObj<typeof AutoRecommendCarousel>;

export const Default: Story = {};
