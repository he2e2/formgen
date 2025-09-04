import React from 'react';
import { CodeBlock } from '../../../components';

export const LanguageSetupContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">언어 설정</h1>
    <p className="text-lg text-gray-600 mb-6">
      FormGen는 다국어를 지원하며, 간단한 설정으로 언어를 변경할 수 있습니다.
    </p>

    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">지원 언어</h2>
        <p className="text-gray-600 mb-4">현재 지원되는 언어들:</p>

        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">ko</code> - 한국어
          </li>
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">en</code> - 영어
            (기본값)
          </li>
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">ja</code> - 일본어
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          언어 우선순위
        </h3>
        <p className="text-gray-600 mb-3">언어는 다음 우선순위로 결정됩니다:</p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <ol className="list-decimal list-inside text-sm text-blue-800 space-y-2">
            <li>
              <strong>사용자 직접 지정</strong> - FormGenerator의 language prop
            </li>
            <li>
              <strong>저장된 설정</strong> - localStorage의 preferred-language
            </li>
            <li>
              <strong>브라우저 언어</strong> - navigator.languages 설정
            </li>
            <li>
              <strong>기본값</strong> - 영어 (en)
            </li>
          </ol>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <strong>참고:</strong> FormGenerator 컴포넌트에서 직접 지정한 언어가
            가장 높은 우선순위를 가지며, 지정하지 않으면 시스템이 자동으로
            적절한 언어를 선택합니다.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          언어 설정 방법
        </h2>
        <p className="text-gray-600 mb-4">
          FormGenerator 컴포넌트에 <code>language</code> prop을 추가하면 됩니다:
        </p>

        <CodeBlock
          title="기본 언어 설정"
          code={`import { FormGenerator, type FormSchema } from '@formgen-he2e2/core';

const schema: FormSchema = {
  groups: [],
  ungroupedFields: [
    {
      type: 'text',
      name: 'name',
      label: '이름',
      required: true,
    },
    {
      type: 'email',
      name: 'email',
      label: '이메일',
      required: true,
    },
  ],
};

// 한국어 (기본값)
<FormGenerator
  schema={schema}
  onSubmit={handleSubmit}
  language="ko"
/>

// 영어
<FormGenerator
  schema={schema}
  onSubmit={handleSubmit}
  language="en"
/>

// 일본어
<FormGenerator
  schema={schema}
  onSubmit={handleSubmit}
  language="ja"
/>`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          다국어 지원 범위
        </h2>
        <p className="text-gray-600 mb-4">언어 설정이 적용되는 요소들:</p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  요소
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  한국어
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  영어
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  일본어
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">제출 버튼</td>
                <td className="px-4 py-2 text-sm text-gray-600">제출</td>
                <td className="px-4 py-2 text-sm text-gray-600">Submit</td>
                <td className="px-4 py-2 text-sm text-gray-600">送信</td>
              </tr>

              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">
                  기본 에러 메시지
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  필수 항목입니다
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  This field is required
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  この項目は必須です
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
