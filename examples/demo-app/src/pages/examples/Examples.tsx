import { FormGenerator, type FormSchema } from '@formgen-he2e2/core';
import { z } from 'zod';

export const simpleFormSchema: FormSchema = {
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
      type: 'email',
      name: 'email',
      label: '이메일',
      required: true,
      placeholder: 'example@email.com',
      order: 2,
    },
    {
      type: 'password',
      name: 'password',
      label: '비밀번호',
      required: true,
      placeholder: '비밀번호를 입력하세요',
      minLength: 6,
      order: 3,
    },
    {
      type: 'checkbox',
      name: 'agree',
      label: '이용약관에 동의합니다',
      required: true,
      order: 4,
    },
  ],
  settings: {
    validateOnChange: true,
    validateOnBlur: true,
    showOptionalLabel: true,
  },
};

export const simpleFormValidation = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 6자 이상 입력해주세요'),
  agree: z.boolean().refine((val) => val, '이용약관에 동의해야 합니다'),
});

export const SimpleFormExample = () => (
  <FormGenerator
    schema={simpleFormSchema}
    customSchema={simpleFormValidation}
    onSubmit={(data) => console.log('Simple Form:', data)}
  />
);

export const passwordConfirmZod = z.object({
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .regex(/^(?=.*[a-z])/, '소문자를 포함해야 합니다')
    .regex(/^(?=.*[A-Z])/, '대문자를 포함해야 합니다')
    .regex(/^(?=.*\d)/, '숫자를 포함해야 합니다')
    .regex(/^(?=.*[@$!%*?&])/, '특수문자(@$!%*?&)를 포함해야 합니다'),
});

export const tabLayoutSchema: FormSchema = {
  groups: [
    {
      id: 'personal',
      title: '개인 정보',
      description: '기본적인 개인 정보를 입력해주세요',
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
          type: 'date',
          name: 'birthDate',
          label: '생년월일',
          required: true,
          order: 3,
        },
        {
          type: 'select',
          name: 'gender',
          label: '성별',
          options: [
            { label: '선택 안함', value: '' },
            { label: '남성', value: 'male' },
            { label: '여성', value: 'female' },
            { label: '기타', value: 'other' },
          ],
          order: 4,
        },
      ],
    },
    {
      id: 'contact',
      title: '연락처',
      description: '연락 가능한 정보를 입력해주세요',
      order: 2,
      fields: [
        {
          type: 'email',
          name: 'email',
          label: '이메일',
          required: true,
          order: 1,
        },
        {
          type: 'text',
          name: 'phone',
          label: '전화번호',
          required: true,
          placeholder: '010-0000-0000',
          order: 2,
        },
        {
          type: 'textarea',
          name: 'address',
          label: '주소',
          placeholder: '상세 주소를 입력하세요',
          order: 3,
        },
      ],
    },
    {
      id: 'preferences',
      title: '설정',
      description: '개인화 설정을 구성해주세요',
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
          type: 'radio',
          name: 'experience',
          label: '경력',
          required: true,
          options: [
            { label: '신입', value: 'junior' },
            { label: '3년 이하', value: 'mid-junior' },
            { label: '3-7년', value: 'mid' },
            { label: '7년 이상', value: 'senior' },
          ],
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
    {
      id: 'security',
      title: '보안 설정',
      description: '안전한 계정을 위한 보안 정보를 입력해주세요',
      order: 4,
      fields: [
        {
          type: 'password',
          name: 'password',
          label: '비밀번호',
          required: true,
          placeholder: '대소문자, 숫자, 특수문자 포함 8자 이상',
          minLength: 8,
          order: 1,
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

export const TabLayoutExample = () => (
  <div className="max-w-3xl mx-auto">
    <FormGenerator
      schema={tabLayoutSchema}
      customSchema={passwordConfirmZod}
      onSubmit={(data) => console.log('Tab Layout Form:', data)}
    />
  </div>
);

export const accordionLayoutSchema: FormSchema = {
  groups: [
    {
      id: 'account',
      title: '계정 설정',
      description: '기본 계정 정보를 설정해주세요',
      required: true,
      collapsible: true,
      collapsed: false,
      order: 1,
      fields: [
        {
          type: 'text',
          name: 'username',
          label: '사용자명',
          required: true,
          minLength: 3,
          maxLength: 20,
          placeholder: '영문, 숫자만 사용 가능',
          order: 1,
        },
        {
          type: 'password',
          name: 'password',
          label: '비밀번호',
          required: true,
          minLength: 8,
          placeholder: '8자 이상 입력하세요',
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
      id: 'billing',
      title: '결제 정보',
      description: '프리미엄/엔터프라이즈 계정을 위한 결제 정보',
      collapsible: true,
      collapsed: true,
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
          placeholder: '카드에 적힌 이름',
          order: 2,
        },
        {
          type: 'text',
          name: 'expiryDate',
          label: '유효기간',
          required: true,
          placeholder: 'MM/YY',
          order: 3,
        },
        {
          type: 'text',
          name: 'cvv',
          label: 'CVV',
          required: true,
          placeholder: '000',
          maxLength: 3,
          order: 4,
        },
      ],
    },
    {
      id: 'company',
      title: '기업 정보',
      description: '엔터프라이즈 고객을 위한 추가 정보',
      collapsible: true,
      collapsed: true,
      order: 3,
      showWhen: {
        when: 'accountType',
        is: 'enterprise',
        operator: 'equals',
      },
      fields: [
        {
          type: 'text',
          name: 'companyName',
          label: '회사명',
          required: true,
          order: 1,
        },
        {
          type: 'text',
          name: 'businessNumber',
          label: '사업자등록번호',
          required: true,
          placeholder: '000-00-00000',
          order: 2,
        },
        {
          type: 'select',
          name: 'companySize',
          label: '회사 규모',
          required: true,
          options: [
            { label: '1-10명', value: '1-10' },
            { label: '11-50명', value: '11-50' },
            { label: '51-200명', value: '51-200' },
            { label: '200명 이상', value: '200+' },
          ],
          order: 3,
        },
        {
          type: 'textarea',
          name: 'requirements',
          label: '특별 요구사항',
          placeholder: '추가 요구사항이 있으면 입력해주세요',
          order: 4,
        },
      ],
    },
  ],
  settings: {
    validateOnChange: true,
    validateOnBlur: true,
    showOptionalLabel: true,
    groupLayout: 'accordion',
  },
};

export const AccordionLayoutExample = () => (
  <div className="max-w-2xl mx-auto">
    <FormGenerator
      schema={accordionLayoutSchema}
      onSubmit={(data) => console.log('Accordion Layout Form:', data)}
      className={{
        form: 'space-y-4',
        accordionItem: ' rounded-lg overflow-hidden',
        accordionHeader:
          'w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 border-b border-gray-200 font-medium text-gray-800 flex justify-between items-center',
        accordionContent: 'p-6 space-y-4',
        groupDescription: 'text-sm text-gray-600 mb-4',
        fieldWrapper: 'mb-4',
        label: 'block text-sm font-medium text-gray-700 mb-2',
        input:
          'w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500',
        button:
          'w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 font-semibold',
      }}
    />
  </div>
);
