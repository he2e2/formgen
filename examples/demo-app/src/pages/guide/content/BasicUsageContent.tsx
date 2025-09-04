import React from 'react';
import { CodeBlock } from '../../../components';

export const BasicUsageContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">기본 사용법</h1>
    <p className="text-lg text-gray-600 mb-6">
      FormGen의 가장 기본적인 사용 방법을 익혀보세요.
    </p>

    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          간단한 폼 만들기
        </h2>
        <p className="text-gray-600 mb-4">
          스키마를 정의하고 폼을 생성하는 기본 방법:
        </p>

        <CodeBlock
          title="기본 폼 스키마"
          code={`import { FormGenerator, type FormSchema } from '@formgen-he2e2/core';
import { z } from 'zod';

const basicFormSchema: FormSchema = {
  groups: [],
  ungroupedFields: [
    {
      type: 'text',
      name: 'name',
      label: '이름',
      required: true,
      placeholder: '이름을 입력하세요',
    },
    {
      type: 'email',
      name: 'email',
      label: '이메일',
      required: true,
      placeholder: 'example@email.com',
    },
    {
      type: 'checkbox',
      name: 'agree',
      label: '이용약관에 동의합니다',
      required: true,
    },
  ],
};`}
        />

        <CodeBlock
          title="폼 컴포넌트"
          code={`export default function MyForm() {
  return (
    <FormGenerator
      schema={basicFormSchema}
      onSubmit={(data) => {
        console.log('폼 데이터:', data);
        // 폼 제출 로직
      }}
    />
  );
}`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          검증 추가하기
        </h2>
        <p className="text-gray-600 mb-4">
          Zod를 사용해 검증 규칙을 추가할 수 있습니다:
        </p>

        <CodeBlock
          title="Zod 검증 스키마"
          code={`const validationSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  agree: z.boolean().refine(val => val, '이용약관에 동의해야 합니다'),
});

// 폼에 검증 적용
<FormGenerator
  schema={basicFormSchema}
  customSchema={validationSchema}
  onSubmit={(data) => console.log(data)}
/>`}
        />
      </div>
    </div>
  </div>
);
