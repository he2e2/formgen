import { FormGenerator } from './FormGenerator';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FormGenerator> = {
  title: 'FormGenerator',
  component: FormGenerator,
};
export default meta;

type Story = StoryObj<typeof FormGenerator>;

export const BasicForm: Story = {
  args: {
    schema: [
      { type: 'text', name: 'username', label: '이름', required: true },
      { type: 'email', name: 'email', label: '이메일' },
      {
        type: 'select',
        name: 'country',
        label: '국가',
        options: [
          { label: '한국', value: 'kr' },
          { label: '미국', value: 'us' },
        ],
      },
      { type: 'checkbox', name: 'agree', label: '약관 동의' },
    ],
    onSubmit: (data) => alert(JSON.stringify(data, null, 2)),
  },
};
