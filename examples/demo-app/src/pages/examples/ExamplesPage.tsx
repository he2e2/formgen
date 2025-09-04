import React, { useState } from 'react';
import { categories, examples } from './data';
import type { Example } from './types';

interface SidebarProps {
  selectedExample: Example | null;
  onSelectExample: (example: Example) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedExample,
  onSelectExample,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'basic',
  ]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto sticky top-0">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">예제 모음</h2>
        <p className="text-sm text-gray-600 mt-1">
          다양한 폼 예제를 확인해보세요
        </p>
      </div>

      <div className="p-4">
        {categories.map((category) => (
          <div key={category.id} className="mb-4">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div>
                <div className="font-semibold">{category.title}</div>
                <div className="text-xs text-gray-500">
                  {category.description}
                </div>
              </div>
              <span className="formgen-accordion-icon">
                {expandedCategories.includes(category.id) ? '▼' : '▶'}
              </span>
            </button>

            {expandedCategories.includes(category.id) && (
              <div className="mt-2 space-y-1">
                {category.examples.map((example) => (
                  <button
                    key={example.id}
                    onClick={() => onSelectExample(example)}
                    className={`w-full text-left px-4 py-3 text-sm rounded-md transition-colors ${
                      selectedExample?.id === example.id
                        ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    <div className="font-medium">{example.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {example.description}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface CodeBlockProps {
  title: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ title, code }) => (
  <div className="bg-gray-900 rounded-lg p-4 mt-4">
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-sm font-medium text-gray-300">{title}</h4>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded bg-gray-800 hover:bg-gray-700"
      >
        복사
      </button>
    </div>
    <pre className="text-sm text-gray-300 overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);

const getExampleCode = (exampleId: string) => {
  const codeExamples: Record<
    string,
    { schema: string; validation?: string; component: string }
  > = {
    'simple-form': {
      schema: `const simpleFormSchema: FormSchema = {
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
};`,
      validation: `const simpleFormValidation = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 6자 이상 입력해주세요'),
  agree: z.boolean().refine(val => val, '이용약관에 동의해야 합니다'),
});`,
      component: `<FormGenerator
  schema={simpleFormSchema}
  customSchema={simpleFormValidation}
  onSubmit={(data) => console.log('Simple Form:', data)}
/>`,
    },
    'complex-validation': {
      schema: `const complexValidationSchema: FormSchema = {
  groups: [
    {
      id: 'security',
      title: '보안 설정',
      description: '안전한 계정을 위한 보안 정보를 입력해주세요',
      fields: [
        {
          type: 'password',
          name: 'password',
          label: '비밀번호',
          required: true,
          placeholder: '대소문자, 숫자, 특수문자 포함 8자 이상',
          minLength: 8,
        },
        {
          type: 'password',
          name: 'passwordConfirm',
          label: '비밀번호 확인',
          required: true,
          compareWith: {
            type: 'equals',
            targetField: 'password',
            message: '비밀번호가 일치하지 않습니다',
          },
        },
      ],
    },
  ],
};`,
      validation: `const complexValidationZod = z.object({
  password: z.string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .regex(/^(?=.*[a-z])/, '소문자를 포함해야 합니다')
    .regex(/^(?=.*[A-Z])/, '대문자를 포함해야 합니다')
    .regex(/^(?=.*\\d)/, '숫자를 포함해야 합니다')
    .regex(/^(?=.*[@$!%*?&])/, '특수문자를 포함해야 합니다'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["passwordConfirm"],
});`,
      component: `<FormGenerator
  schema={complexValidationSchema}
  customSchema={complexValidationZod as any}
  onSubmit={(data) => console.log(data)}
/>`,
    },
    'tab-layout': {
      schema: `const tabLayoutSchema: FormSchema = {
  groups: [
    {
      id: 'personal',
      title: '개인 정보',
      description: '기본적인 개인 정보를 입력해주세요',
      fields: [
        { type: 'text', name: 'firstName', label: '이름', required: true },
        { type: 'text', name: 'lastName', label: '성', required: true },
        { type: 'date', name: 'birthDate', label: '생년월일', required: true },
      ],
    },
    {
      id: 'contact',
      title: '연락처',
      description: '연락 가능한 정보를 입력해주세요',
      fields: [
        { type: 'email', name: 'email', label: '이메일', required: true },
        { type: 'text', name: 'phone', label: '전화번호', required: true },
      ],
    },
  ],
  settings: {
    groupLayout: 'tabs',
  },
};`,
      validation: `export const passwordConfirmZod = z.object({
  password: z
  .string()
  .min(8, '비밀번호는 8자 이상이어야 합니다')
  .regex(/^(?=.*[a-z])/, '소문자를 포함해야 합니다')
  .regex(/^(?=.*[A-Z])/, '대문자를 포함해야 합니다')
  .regex(/^(?=.*\d)/, '숫자를 포함해야 합니다')
  .regex(/^(?=.*[@$!%*?&])/, '특수문자(@$!%*?&)를 포함해야 합니다'),
});`,
      component: `<FormGenerator
  schema={tabLayoutSchema}
  customSchema={passwordConfirmZod}
  onSubmit={(data) => console.log('Tab Layout Form:', data)}
/>`,
    },
    'accordion-layout': {
      schema: `const accordionLayoutSchema: FormSchema = {
  groups: [
    {
      id: 'account',
      title: '계정 설정',
      collapsible: true,
      collapsed: false,
      fields: [
        { type: 'text', name: 'username', label: '사용자명', required: true },
        { type: 'password', name: 'password', label: '비밀번호', required: true },
      ],
    },
    {
      id: 'billing',
      title: '결제 정보',
      collapsible: true,
      collapsed: true,
      fields: [
        { type: 'text', name: 'cardNumber', label: '카드번호', required: true },
        { type: 'text', name: 'cardHolder', label: '카드 소유자', required: true },
      ],
    },
  ],
  settings: {
    groupLayout: 'accordion',
  },
};`,
      component: `<FormGenerator
  schema={accordionLayoutSchema}
  onSubmit={(data) => console.log(data)}
  className={{
    accordionItem: "rounded-lg overflow-hidden",
    accordionHeader: "w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100",
    accordionContent: "p-6 space-y-4",
  }}
/>`,
    },
  };

  return codeExamples[exampleId] || { schema: '', component: '' };
};

export const ExamplesPage: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<Example | null>(
    examples[0]
  );

  const exampleCode = selectedExample
    ? getExampleCode(selectedExample.id)
    : null;

  return (
    <div className="flex bg-gray-50">
      <Sidebar
        selectedExample={selectedExample}
        onSelectExample={setSelectedExample}
      />

      <div className="flex-1">
        {selectedExample ? (
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedExample.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {selectedExample.description}
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  selectedExample.category === 'basic'
                    ? 'bg-green-100 text-green-800'
                    : selectedExample.category === 'advanced'
                      ? 'bg-blue-100 text-blue-800'
                      : selectedExample.category === 'business'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-orange-100 text-orange-800'
                }`}
              >
                {selectedExample.category}
              </span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  실제 폼
                </h3>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <selectedExample.component />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  코드 예제
                </h3>
                <div className="space-y-4">
                  {exampleCode && (
                    <>
                      <CodeBlock
                        title="스키마 정의"
                        code={exampleCode.schema}
                      />
                      {exampleCode.validation && (
                        <CodeBlock
                          title="Zod 검증"
                          code={exampleCode.validation}
                        />
                      )}
                      <CodeBlock
                        title="컴포넌트 사용"
                        code={exampleCode.component}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                예제를 선택하세요
              </h2>
              <p className="text-gray-500">
                왼쪽 사이드바에서 확인하고 싶은 예제를 클릭해보세요
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
