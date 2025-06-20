import { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';

import { FormGenerator } from '../src/components/FormGenerator';
import type { FormField } from '../src/types/schema';

const meta: Meta<typeof FormGenerator> = {
  title: 'FormGenerator',
  component: FormGenerator,
};
export default meta;

const schema: FormField[] = [
  {
    type: 'text',
    name: 'username',
    label: '사용자명',
    required: true,
    minLength: 3,
    maxLength: 10,
    placeholder: '3~10자',
  },
  { type: 'email', name: 'email', label: '이메일', required: true },
  { type: 'checkbox', name: 'agree', label: '약관 동의', required: true },
  {
    type: 'checkbox',
    name: 'interests',
    label: '관심사',
    required: true,
    options: [
      { label: 'Frontend', value: 'fe' },
      { label: 'Backend', value: 'be' },
      { label: 'DevOps', value: 'devops' },
    ],
    minSelected: 2,
  },
  {
    type: 'text',
    name: 'customField',
    label: '커스텀 필드',
    required: true,
    placeholder: 'formgen 포함 문자열',
  },
];

const customSchema = z.object({
  customField: z
    .string()
    .includes('formgen', { message: 'formgen 이라는 단어를 포함해야 합니다.' }),

  interests: z.array(z.string()).min(2, { message: '관심사는 최소 2개 이상 선택해야 합니다.' }),
});

type Story = StoryObj<typeof FormGenerator>;

export const CombinedValidation: Story = {
  args: {
    schema,
    customSchema,
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2));
    },
  },
};
