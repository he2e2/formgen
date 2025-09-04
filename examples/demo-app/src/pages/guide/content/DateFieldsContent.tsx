import React from 'react';
import { CodeBlock } from '../../../components';

export const DateFieldsContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">날짜 필드</h1>
    <p className="text-lg text-gray-600 mb-6">
      날짜와 시간 입력을 위한 date 필드 타입의 사용법과 다양한 형식을
      알아보세요.
    </p>

    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          기본 날짜 필드
        </h2>
        <p className="text-gray-600 mb-4">가장 기본적인 날짜 입력 필드:</p>

        <CodeBlock
          title="기본 날짜 필드 예제"
          code={`const dateFieldSchema: FormSchema = {
  groups: [],
  ungroupedFields: [
    {
      type: 'date',
      name: 'birthDate',
      label: '생년월일',
      required: true,
      format: 'date', // 기본값
      placeholder: 'YYYY-MM-DD',
    },
    
    {
      type: 'date',
      name: 'appointmentDateTime',
      label: '예약 날짜 및 시간',
      required: true,
      format: 'datetime-local',
      placeholder: 'YYYY-MM-DD HH:MM',
    },
    
    {
      type: 'date',
      name: 'meetingTime',
      label: '회의 시간',
      format: 'time',
      placeholder: 'HH:MM',
    },
  ],
};`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          DateField 속성
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
                <td className="px-4 py-2 text-sm text-gray-900">format</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  'date' | 'datetime-local' | 'time'
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  날짜/시간 형식
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">'date'</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">min</td>
                <td className="px-4 py-2 text-sm text-gray-600">string</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  최소 날짜/시간
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  '2024-01-01'
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">max</td>
                <td className="px-4 py-2 text-sm text-gray-600">string</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  최대 날짜/시간
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  '2025-12-31'
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
