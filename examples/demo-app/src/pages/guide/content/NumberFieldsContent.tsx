import React from 'react';
import { CodeBlock } from '../../../components';

export const NumberFieldsContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">숫자 필드</h1>
    <p className="text-lg text-gray-600 mb-6">
      숫자 입력을 위한 number 필드 타입의 사용법과 옵션들을 알아보세요.
    </p>

    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          기본 숫자 필드
        </h2>
        <p className="text-gray-600 mb-4">가장 기본적인 숫자 입력 필드:</p>

        <CodeBlock
          title="기본 숫자 필드 예제"
          code={`const numberFieldSchema: FormSchema = {
  groups: [],
  ungroupedFields: [
    {
      type: 'number',
      name: 'age',
      label: '나이',
      required: true,
      placeholder: '나이를 입력하세요',
      min: 0,
      max: 120,
    },
    {
      type: 'number',
      name: 'price',
      label: '가격',
      required: true,
      placeholder: '0',
      step: 0.01, // 소수점 입력 허용
    },
  ],
};`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          NumberField 속성
        </h2>
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
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  예제
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">min</td>
                <td className="px-4 py-2 text-sm text-gray-600">number</td>
                <td className="px-4 py-2 text-sm text-gray-600">최솟값</td>
                <td className="px-4 py-2 text-sm text-gray-600">0</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">max</td>
                <td className="px-4 py-2 text-sm text-gray-600">number</td>
                <td className="px-4 py-2 text-sm text-gray-600">최댓값</td>
                <td className="px-4 py-2 text-sm text-gray-600">100</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">step</td>
                <td className="px-4 py-2 text-sm text-gray-600">number</td>
                <td className="px-4 py-2 text-sm text-gray-600">증감 단위</td>
                <td className="px-4 py-2 text-sm text-gray-600">0.1, 5, 10</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">integer</td>
                <td className="px-4 py-2 text-sm text-gray-600">boolean</td>
                <td className="px-4 py-2 text-sm text-gray-600">정수만 허용</td>
                <td className="px-4 py-2 text-sm text-gray-600">true</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
