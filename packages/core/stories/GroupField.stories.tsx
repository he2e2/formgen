import { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';

import { FormGenerator } from '../src/components/FormGenerator';
import type { FormSchema } from '../src/form-schema';

const meta: Meta<typeof FormGenerator> = {
  title: 'FormGenerator/Group Fields',
  component: FormGenerator,
};
export default meta;

type Story = StoryObj<typeof FormGenerator>;

const conditionalSchema: FormSchema = {
  groups: [],
  ungroupedFields: [
    {
      type: 'text',
      name: 'name',
      label: '이름',
      required: true,
      placeholder: '이름을 입력하세요',
      order: 1,
    },
    {
      type: 'select',
      name: 'userType',
      label: '사용자 유형',
      required: true,
      options: [
        { label: '개인', value: 'individual' },
        { label: '기업', value: 'business' },
        { label: '학생', value: 'student' },
      ],
      order: 2,
    },
    {
      type: 'text',
      name: 'companyName',
      label: '회사명',
      required: true,
      placeholder: '회사명을 입력하세요',
      showWhen: {
        when: 'userType',
        is: 'business',
        operator: 'equals',
      },
      order: 3,
    },
    {
      type: 'text',
      name: 'businessNumber',
      label: '사업자등록번호',
      placeholder: '000-00-00000',
      showWhen: {
        when: 'userType',
        is: 'business',
        operator: 'equals',
      },
      order: 4,
    },
    {
      type: 'text',
      name: 'school',
      label: '학교명',
      required: true,
      placeholder: '학교명을 입력하세요',
      showWhen: {
        when: 'userType',
        is: 'student',
        operator: 'equals',
      },
      order: 5,
    },
    {
      type: 'select',
      name: 'grade',
      label: '학년',
      options: [
        { label: '1학년', value: '1' },
        { label: '2학년', value: '2' },
        { label: '3학년', value: '3' },
        { label: '4학년', value: '4' },
      ],
      showWhen: {
        when: 'userType',
        is: 'student',
        operator: 'equals',
      },
      order: 6,
    },
    {
      type: 'select',
      name: 'ageGroup',
      label: '연령대',
      required: true,
      options: [
        { label: '10대', value: 'teen' },
        { label: '20대', value: 'twenties' },
        { label: '30대', value: 'thirties' },
        { label: '40대 이상', value: 'forties_plus' },
      ],
      order: 7,
    },
    {
      type: 'checkbox',
      name: 'hasChildren',
      label: '자녀가 있습니다',
      showWhen: {
        when: 'ageGroup',
        is: 'thirties',
        operator: 'equals',
      },
      order: 8,
    },
    {
      type: 'checkbox',
      name: 'hasChildren40',
      label: '자녀가 있습니다',
      showWhen: {
        when: 'ageGroup',
        is: 'forties_plus',
        operator: 'equals',
      },
      order: 9,
    },
  ],
};

const groupedSchema: FormSchema = {
  groups: [
    {
      id: 'basic-info',
      title: '기본 정보',
      description: '필수 정보를 입력해주세요',
      required: true,
      order: 1,
      fields: [
        {
          type: 'text',
          name: 'firstName',
          label: '이름',
          required: true,
          order: 1,
        },
        {
          type: 'text',
          name: 'lastName',
          label: '성',
          required: true,
          order: 2,
        },
        {
          type: 'email',
          name: 'email',
          label: '이메일',
          required: true,
          order: 3,
        },
        {
          type: 'date',
          name: 'birthDate',
          label: '생년월일',
          order: 4,
        },
      ],
    },
    {
      id: 'contact-info',
      title: '연락처 정보',
      description: '연락 가능한 정보를 입력해주세요',
      collapsible: true,
      collapsed: false,
      order: 2,
      fields: [
        {
          type: 'text',
          name: 'phone',
          label: '전화번호',
          placeholder: '010-0000-0000',
          order: 1,
        },
        {
          type: 'text',
          name: 'address',
          label: '주소',
          placeholder: '주소를 입력하세요',
          order: 2,
        },
        {
          type: 'text',
          name: 'zipCode',
          label: '우편번호',
          placeholder: '00000',
          order: 3,
        },
      ],
    },
    {
      id: 'preferences',
      title: '환경 설정',
      description: '개인화 설정을 구성해주세요',
      collapsible: true,
      collapsed: true,
      order: 3,
      fields: [
        {
          type: 'checkbox',
          name: 'interests',
          label: '관심 분야',
          options: [
            { label: 'IT/개발', value: 'it' },
            { label: '디자인', value: 'design' },
            { label: '마케팅', value: 'marketing' },
            { label: '비즈니스', value: 'business' },
          ],
          order: 1,
        },
        {
          type: 'select',
          name: 'language',
          label: '선호 언어',
          options: [
            { label: '한국어', value: 'ko' },
            { label: 'English', value: 'en' },
            { label: '日本語', value: 'ja' },
          ],
          defaultValue: 'ko',
          order: 2,
        },
        {
          type: 'checkbox',
          name: 'newsletter',
          label: '뉴스레터 구독',
          order: 3,
        },
      ],
    },
  ],
  ungroupedFields: [],
  settings: {
    validateOnChange: true,
    validateOnBlur: true,
    showOptionalLabel: true,
    groupLayout: 'sections',
  },
};

const tabLayoutSchema: FormSchema = {
  ...groupedSchema,
  settings: {
    ...groupedSchema.settings,
    groupLayout: 'tabs',
  },
};

const accordionLayoutSchema: FormSchema = {
  ...groupedSchema,
  settings: {
    ...groupedSchema.settings,
    groupLayout: 'accordion',
  },
};

const mixedSchema: FormSchema = {
  groups: [
    {
      id: 'account',
      title: '계정 설정',
      description: '기본 계정 정보를 설정해주세요',
      required: true,
      order: 1,
      fields: [
        {
          type: 'text',
          name: 'username',
          label: '사용자명',
          required: true,
          minLength: 3,
          maxLength: 20,
          order: 1,
        },
        {
          type: 'password',
          name: 'password',
          label: '비밀번호',
          required: true,
          minLength: 8,
          order: 2,
        },
        {
          type: 'select',
          name: 'accountType',
          label: '계정 유형',
          required: true,
          options: [
            { label: '무료', value: 'free' },
            { label: '프리미엄', value: 'premium' },
            { label: '엔터프라이즈', value: 'enterprise' },
          ],
          order: 3,
        },
      ],
    },
    {
      id: 'payment',
      title: '결제 정보',
      description: '결제 카드 정보를 입력해주세요',
      order: 2,
      showWhen: {
        when: 'accountType',
        is: 'free',
        operator: 'not-equals',
      },
      fields: [
        {
          type: 'text',
          name: 'cardNumber',
          label: '카드번호',
          required: true,
          placeholder: '0000-0000-0000-0000',
          order: 1,
        },
        {
          type: 'text',
          name: 'cardHolder',
          label: '카드 소유자',
          required: true,
          order: 2,
        },
      ],
    },
    {
      id: 'enterprise',
      title: '기업 정보',
      description: '기업 고객을 위한 추가 정보',
      collapsible: true,
      order: 3,
      showWhen: {
        when: 'accountType',
        is: 'enterprise',
        operator: 'equals',
      },
      fields: [
        {
          type: 'text',
          name: 'companySize',
          label: '회사 규모',
          placeholder: '직원 수를 입력하세요',
          order: 1,
        },
        {
          type: 'textarea',
          name: 'requirements',
          label: '특별 요구사항',
          placeholder: '추가 요구사항이 있다면 입력해주세요',
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

const customValidationSchema = z.object({
  username: z
    .string()
    .min(3, '사용자명은 최소 3자 이상이어야 합니다')
    .max(20, '사용자명은 최대 20자까지 가능합니다')
    .regex(/^[a-zA-Z0-9_]+$/, '사용자명은 영문, 숫자, 언더스코어만 사용 가능합니다'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '비밀번호는 대소문자와 숫자를 포함해야 합니다'),
  cardNumber: z
    .string()
    .regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, '올바른 카드번호 형식이 아닙니다')
    .optional(),
});

export const ConditionalFields: Story = {
  args: {
    schema: conditionalSchema,
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2));
    },
  },
};

export const FieldGrouping: Story = {
  args: {
    schema: groupedSchema,
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2));
    },
  },
};

export const TabLayout: Story = {
  args: {
    schema: tabLayoutSchema,
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2));
    },
  },
};

export const AccordionLayout: Story = {
  args: {
    schema: accordionLayoutSchema,
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2));
    },
  },
};

export const MixedFeaturesWithValidation: Story = {
  args: {
    schema: mixedSchema,
    customSchema: customValidationSchema,
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2));
    },
  },
};
