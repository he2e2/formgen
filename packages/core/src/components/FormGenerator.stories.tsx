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
      { type: 'password', name: 'password', label: '비밀번호', required: true },
      { type: 'number', name: 'age', label: '나이', required: true },
      {
        type: 'date',
        name: 'birthdate',
        label: '생년월일',
        required: true,
        min: '1900-01-01',
        max: new Date().toISOString().split('T')[0],
      },
      {
        type: 'textarea',
        name: 'bio',
        label: '자기소개',
        placeholder: '자신에 대해 간단히 소개해주세요.',
      },
      {
        type: 'select',
        name: 'country',
        label: '국가',
        options: [
          { label: '한국', value: 'kr' },
          { label: '미국', value: 'us' },
        ],
      },
      { type: 'checkbox', name: 'agree1', label: '약관 동의', required: true },
      { type: 'checkbox', name: 'agree2', label: '약관 동의' },
      {
        type: 'checkbox',
        name: 'agree3',
        label: '약관 동의',
        options: [
          { label: '서비스 약관', value: 'terms' },
          { label: '개인정보 처리방침', value: 'privacy' },
        ],
        required: true,
      },
      {
        type: 'checkbox',
        name: 'agree4',
        label: '약관 동의',
        options: [
          { label: '서비스 약관', value: 'terms' },
          { label: '개인정보 처리방침', value: 'privacy' },
        ],
      },
      {
        type: 'radio',
        name: 'sex',
        label: '성별',
        options: [
          { label: '남성', value: 'man' },
          { label: '여성', value: 'woman' },
        ],
      },
      {
        type: 'radio',
        name: 'sex2',
        label: '성별',
        required: true,
        options: [
          { label: '남성', value: 'man' },
          { label: '여성', value: 'woman' },
        ],
      },
    ],
    onSubmit: (data) => alert(JSON.stringify(data, null, 2)),
  },
};
