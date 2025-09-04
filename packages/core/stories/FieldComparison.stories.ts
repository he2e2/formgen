import { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';

import { FormGenerator } from '../src/components/FormGenerator';
import type { FormSchema } from '../src/form-schema';

const meta: Meta<typeof FormGenerator> = {
  title: 'FormGenerator/Field Comparison',
  component: FormGenerator,
};
export default meta;

type Story = StoryObj<typeof FormGenerator>;

const passwordConfirmationSchema: FormSchema = {
  groups: [
    {
      id: 'security',
      title: '보안 설정',
      description: '안전한 비밀번호를 설정해주세요',
      fields: [
        {
          type: 'text',
          name: 'username',
          label: '사용자명',
          required: true,
          placeholder: '사용자명을 입력하세요',
          order: 1,
        },
        {
          type: 'password',
          name: 'password',
          label: '비밀번호',
          required: true,
          placeholder: '비밀번호를 입력하세요',
          minLength: 8,
          order: 2,
        },
        {
          type: 'password',
          name: 'passwordConfirm',
          label: '비밀번호 확인',
          required: true,
          placeholder: '비밀번호를 다시 입력하세요',
          compareWith: {
            type: 'equals',
            targetField: 'password',
            message: '비밀번호가 일치하지 않습니다',
          },
          order: 3,
        },
      ],
    },
  ],
  settings: {
    validateOnChange: true,
    validateOnBlur: true,
    showOptionalLabel: true,
  },
};

// 숫자 범위 비교 스키마
const numericComparisonSchema: FormSchema = {
  groups: [
    {
      id: 'budget',
      title: '예산 설정',
      description: '최소/최대 예산을 설정해주세요',
      fields: [
        {
          type: 'number',
          name: 'minBudget',
          label: '최소 예산',
          required: true,
          placeholder: '최소 예산을 입력하세요',
          min: 0,
          order: 1,
        },
        {
          type: 'number',
          name: 'maxBudget',
          label: '최대 예산',
          required: true,
          placeholder: '최대 예산을 입력하세요',
          min: 0,
          compareWith: {
            type: 'greater-than',
            targetField: 'minBudget',
            message: '최대 예산은 최소 예산보다 커야 합니다',
          },
          order: 2,
        },
      ],
    },
    {
      id: 'dates',
      title: '기간 설정',
      description: '시작일과 종료일을 설정해주세요',
      fields: [
        {
          type: 'date',
          name: 'startDate',
          label: '시작일',
          required: true,
          order: 1,
        },
        {
          type: 'date',
          name: 'endDate',
          label: '종료일',
          required: true,
          compareWith: {
            type: 'greater-than',
            targetField: 'startDate',
            message: '종료일은 시작일 이후여야 합니다',
          },
          order: 2,
        },
      ],
    },
  ],
  settings: {
    validateOnChange: true,
    validateOnBlur: true,
    showOptionalLabel: true,
    groupLayout: 'sections',
  },
};

const customValidationSchema: FormSchema = {
  groups: [
    {
      id: 'profile',
      title: '프로필 설정',
      description: '개인 정보를 입력해주세요',
      fields: [
        {
          type: 'text',
          name: 'email',
          label: '이메일',
          required: true,
          placeholder: 'email@example.com',
          order: 1,
        },
        {
          type: 'text',
          name: 'emailConfirm',
          label: '이메일 확인',
          required: true,
          placeholder: '이메일을 다시 입력하세요',
          compareWith: {
            type: 'equals',
            targetField: 'email',
            message: '이메일이 일치하지 않습니다',
          },
          order: 2,
        },
        {
          type: 'text',
          name: 'phoneNumber',
          label: '전화번호',
          required: true,
          placeholder: '010-0000-0000',
          order: 3,
        },
        {
          type: 'text',
          name: 'emergencyContact',
          label: '비상연락처',
          required: true,
          placeholder: '010-0000-0000',
          compareWith: {
            type: 'not-equals',
            targetField: 'phoneNumber',
            message: '비상연락처는 본인 전화번호와 달라야 합니다',
          },
          order: 4,
        },
        {
          type: 'text',
          name: 'referralCode',
          label: '추천인 코드',
          placeholder: '추천인 코드를 입력하세요',
          order: 5,
        },
        {
          type: 'text',
          name: 'myReferralCode',
          label: '내 추천 코드',
          placeholder: '내 추천 코드를 입력하세요',
          compareWith: {
            type: 'custom',
            targetField: 'referralCode',
            message: '자신을 추천할 수 없습니다',
            customValidator: (myCode: string, referralCode: string) => {
              if (!myCode || !referralCode) return true;
              return myCode !== referralCode;
            },
          },
          order: 6,
        },
      ],
    },
  ],
  settings: {
    validateOnChange: true,
    validateOnBlur: true,
    showOptionalLabel: true,
  },
};

const complexComparisonSchema: FormSchema = {
  groups: [
    {
      id: 'registration',
      title: '회원가입',
      description: '계정 정보를 입력해주세요',
      fields: [
        {
          type: 'select',
          name: 'accountType',
          label: '계정 유형',
          required: true,
          options: [
            { label: '개인', value: 'personal' },
            { label: '기업', value: 'business' },
          ],
          order: 1,
        },
        {
          type: 'text',
          name: 'personalId',
          label: '개인 ID',
          required: true,
          placeholder: '개인 ID를 입력하세요',
          showWhen: {
            when: 'accountType',
            is: 'personal',
            operator: 'equals',
          },
          order: 2,
        },
        {
          type: 'text',
          name: 'businessId',
          label: '사업자 ID',
          required: true,
          placeholder: '사업자 ID를 입력하세요',
          showWhen: {
            when: 'accountType',
            is: 'business',
            operator: 'equals',
          },
          order: 3,
        },
        {
          type: 'password',
          name: 'password',
          label: '비밀번호',
          required: true,
          placeholder: '비밀번호를 입력하세요',
          minLength: 8,
          order: 4,
        },
        {
          type: 'password',
          name: 'passwordConfirm',
          label: '비밀번호 확인',
          required: true,
          placeholder: '비밀번호를 다시 입력하세요',
          compareWith: {
            type: 'equals',
            targetField: 'password',
            message: '비밀번호가 일치하지 않습니다',
          },
          order: 5,
        },
      ],
    },
    {
      id: 'verification',
      title: '본인 인증',
      description: '본인 확인을 위한 정보를 입력해주세요',
      fields: [
        {
          type: 'text',
          name: 'verificationCode',
          label: '인증 코드',
          required: true,
          placeholder: '6자리 인증 코드',
          maxLength: 6,
          order: 1,
        },
        {
          type: 'text',
          name: 'verificationConfirm',
          label: '인증 코드 확인',
          required: true,
          placeholder: '인증 코드를 다시 입력하세요',
          maxLength: 6,
          compareWith: {
            type: 'equals',
            targetField: 'verificationCode',
            message: '인증 코드가 일치하지 않습니다',
          },
          order: 2,
        },
      ],
    },
  ],
  settings: {
    validateOnChange: true,
    validateOnBlur: true,
    showOptionalLabel: true,
    groupLayout: 'tabs',
  },
};

const ageBasedValidationSchema: FormSchema = {
  groups: [
    {
      id: 'personal-info',
      title: '개인정보',
      fields: [
        {
          type: 'number',
          name: 'age',
          label: '나이',
          required: true,
          min: 1,
          max: 150,
          order: 1,
        },
        {
          type: 'text',
          name: 'parentName',
          label: '보호자 이름',
          required: true,
          placeholder: '보호자 이름을 입력하세요',
          showWhen: {
            when: 'age',
            is: 18,
            operator: 'less-than',
          },
          order: 2,
        },
        {
          type: 'text',
          name: 'parentPhone',
          label: '보호자 연락처',
          required: true,
          placeholder: '010-0000-0000',
          showWhen: {
            when: 'age',
            is: 18,
            operator: 'less-than',
          },
          order: 3,
        },
        {
          type: 'text',
          name: 'myPhone',
          label: '본인 연락처',
          required: true,
          placeholder: '010-0000-0000',
          order: 4,
        },
        {
          type: 'text',
          name: 'emergencyPhone',
          label: '비상연락처',
          required: true,
          placeholder: '010-0000-0000',
          compareWith: {
            type: 'not-equals',
            targetField: 'myPhone',
            message: '비상연락처는 본인 연락처와 달라야 합니다',
          },
          order: 5,
        },
      ],
    },
  ],
  settings: {
    validateOnChange: true,
    validateOnBlur: true,
    showOptionalLabel: true,
  },
};

const customZodSchema = z.object({
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '대소문자와 숫자를 포함해야 합니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  phoneNumber: z.string().regex(/^010-\d{4}-\d{4}$/, '010-0000-0000 형식으로 입력해주세요'),
  emergencyContact: z.string().regex(/^010-\d{4}-\d{4}$/, '010-0000-0000 형식으로 입력해주세요'),
});

export const PasswordConfirmation: Story = {
  args: {
    schema: passwordConfirmationSchema,
    onSubmit: (data) => {
      console.log('Submitted data:', data);
      alert(JSON.stringify(data, null, 2));
    },
  },
};

export const NumericComparison: Story = {
  args: {
    schema: numericComparisonSchema,
    onSubmit: (data) => {
      console.log('Submitted data:', data);
      alert(JSON.stringify(data, null, 2));
    },
  },
};

export const CustomValidation: Story = {
  args: {
    schema: customValidationSchema,
    onSubmit: (data) => {
      console.log('Submitted data:', data);
      alert(JSON.stringify(data, null, 2));
    },
  },
};

export const ComplexComparison: Story = {
  args: {
    schema: complexComparisonSchema,
    onSubmit: (data) => {
      console.log('Submitted data:', data);
      alert(JSON.stringify(data, null, 2));
    },
  },
};

export const AgeBasedValidation: Story = {
  args: {
    schema: ageBasedValidationSchema,
    onSubmit: (data) => {
      console.log('Submitted data:', data);
      alert(JSON.stringify(data, null, 2));
    },
  },
};

export const WithCustomZodSchema: Story = {
  args: {
    schema: customValidationSchema,
    customSchema: customZodSchema,
    onSubmit: (data) => {
      console.log('Submitted data:', data);
      alert(JSON.stringify(data, null, 2));
    },
  },
};
