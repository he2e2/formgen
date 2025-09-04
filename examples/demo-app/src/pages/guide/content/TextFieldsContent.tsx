import React from 'react';
import { CodeBlock } from '../../../components';

export const TextFieldsContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">텍스트 필드</h1>
    <p className="text-lg text-gray-600 mb-6">
      text, email, password, textarea 필드 타입들의 사용법을 알아보세요.
    </p>

    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          지원하는 텍스트 필드 타입
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">text</code> - 기본
            텍스트 입력
          </li>
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">email</code> -
            이메일 주소 입력
          </li>
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">password</code> -
            비밀번호 입력
          </li>
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">textarea</code> -
            여러 줄 텍스트 입력
          </li>
        </ul>

        <CodeBlock
          title="텍스트 필드 예제"
          code={`const textFieldsSchema: FormSchema = {
  groups: [],
  ungroupedFields: [
    {
      type: 'text',
      name: 'username',
      label: '사용자명',
      required: true,
      placeholder: '사용자명을 입력하세요',
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
    },
    {
      type: 'email',
      name: 'email',
      label: '이메일',
      required: true,
      placeholder: 'user@example.com',
    },
    {
      type: 'password',
      name: 'password',
      label: '비밀번호',
      required: true,
      minLength: 8,
      placeholder: '8자 이상 입력하세요',
    },
    {
      type: 'textarea',
      name: 'description',
      label: '설명',
      placeholder: '상세 내용을 입력하세요...',
      maxLength: 500,
    },
  ],
};`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">필드 속성</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  속성
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  타입
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  설명
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">minLength</td>
                <td className="px-4 py-2 text-sm text-gray-600">number</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  최소 글자 수
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">maxLength</td>
                <td className="px-4 py-2 text-sm text-gray-600">number</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  최대 글자 수
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">pattern</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  string | RegExp
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  유효성 검사 패턴
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
