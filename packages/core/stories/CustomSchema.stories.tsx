import { FormGenerator } from '../src/components/FormGenerator';
import type { Meta, StoryObj } from '@storybook/react';
import type { FormField } from '../src/types/schema';
import { z } from 'zod';

const meta: Meta<typeof FormGenerator> = {
  title: 'FormGenerator',
  component: FormGenerator,
};
export default meta;

type Story = StoryObj<typeof FormGenerator>;

const schema: FormField[] = [
  {
    type: 'text',
    name: 'nickname',
    label: '닉네임',
    required: true,
    minLength: 3,
    maxLength: 10,
    pattern: '^[가-힣a-zA-Z0-9]+$',
    placeholder: '한글, 영문, 숫자 3~10자',
  },
  {
    type: 'email',
    name: 'email',
    label: '이메일',
    required: true,
  },
  {
    type: 'password',
    name: 'password',
    label: '비밀번호',
    required: true,
    minLength: 6,
  },
  {
    type: 'checkbox',
    name: 'interests',
    label: '관심사 선택 (최소 2개)',
    required: true,
    options: [
      { label: '프론트엔드', value: 'frontend' },
      { label: '백엔드', value: 'backend' },
      { label: '디자인', value: 'design' },
    ],
    minSelected: 2,
  },
  {
    type: 'text',
    name: 'customField',
    label: '커스텀 조건 필드',
    placeholder: '입력은 반드시 "formgen" 포함',
    required: true,
  },
];

const customValidation = z.object({
  nickname: z
    .string()
    .min(3, '닉네임은 최소 3자 이상입니다.')
    .max(10, '닉네임은 최대 10자까지 가능합니다.')
    .regex(/^[가-힣a-zA-Z0-9]+$/, '특수문자 없이 한글/영문/숫자만 입력하세요.'),
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
  interests: z.array(z.string()).min(2, '관심사는 최소 2개 이상 선택해야 합니다.'),
  customField: z.string().refine((val) => val.includes('formgen'), {
    message: 'formgen이라는 단어가 포함되어야 합니다.',
  }),
});

export const CustomSchema: Story = {
  args: {
    schema,
    onSubmit: (data) => alert(JSON.stringify(data, null, 2)),
    customSchema: customValidation,
  },
};
