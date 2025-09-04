import React from 'react';
import { CodeBlock } from '../../../components';

export const ChoiceFieldsContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">선택 필드</h1>
    <p className="text-lg text-gray-600 mb-6">
      checkbox, radio, select 필드 타입들의 사용법과 다양한 옵션들을 알아보세요.
    </p>

    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          지원하는 선택 필드 타입
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">checkbox</code> -
            다중 선택 가능한 체크박스
          </li>
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">radio</code> - 단일
            선택 라디오 버튼
          </li>
          <li>
            <code className="bg-gray-100 px-2 py-1 rounded">select</code> -
            드롭다운 선택 박스
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          체크박스 필드
        </h2>
        <p className="text-gray-600 mb-4">다중 선택이 가능한 체크박스 필드:</p>

        <CodeBlock
          title="체크박스 필드 예제"
          code={`const checkboxFieldSchema: FormSchema = {
  groups: [],
  ungroupedFields: [
    // 단일 체크박스 (약관 동의)
    {
      type: 'checkbox',
      name: 'agree',
      label: '이용약관에 동의합니다',
      required: true,
    },
    
    // 다중 선택 체크박스
    {
      type: 'checkbox',
      name: 'interests',
      label: '관심 분야를 선택해주세요',
      multiple: true,
      options: [
        { label: 'IT/개발', value: 'it' },
        { label: '디자인', value: 'design' },
        { label: '마케팅', value: 'marketing' },
        { label: '비즈니스', value: 'business' },
        { label: '기타', value: 'other', disabled: true },
      ],
      minSelected: 1, // 최소 1개 선택
      maxSelected: 3, // 최대 3개 선택
      description: '최소 1개, 최대 3개까지 선택 가능합니다',
    },
  ],
};`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          라디오 버튼 필드
        </h2>
        <p className="text-gray-600 mb-4">
          단일 선택만 가능한 라디오 버튼 필드:
        </p>

        <CodeBlock
          title="라디오 버튼 필드 예제"
          code={`const radioFieldSchema: FormSchema = {
  groups: [],
  ungroupedFields: [
    {
      type: 'radio',
      name: 'gender',
      label: '성별',
      required: true,
      options: [
        { label: '남성', value: 'male' },
        { label: '여성', value: 'female' },
        { label: '선택 안함', value: 'none' },
      ],
      defaultValue: 'none',
    },
    
    {
      type: 'radio',
      name: 'experience',
      label: '경력',
      required: true,
      options: [
        { label: '신입 (0년)', value: 'junior' },
        { label: '주니어 (1-3년)', value: 'mid-junior' },
        { label: '미들 (3-7년)', value: 'mid' },
        { label: '시니어 (7년+)', value: 'senior' },
      ],
      description: '현재 업무 경력을 선택해주세요',
    },
  ],
};`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          셀렉트 박스 필드
        </h2>
        <p className="text-gray-600 mb-4">드롭다운 형태의 선택 필드:</p>

        <CodeBlock
          title="셀렉트 박스 필드 예제"
          code={`const selectFieldSchema: FormSchema = {
  groups: [],
  ungroupedFields: [
    // 단일 선택 셀렉트
    {
      type: 'select',
      name: 'country',
      label: '국가',
      required: true,
      placeholder: '국가를 선택하세요',
      options: [
        { label: '대한민국', value: 'kr' },
        { label: '미국', value: 'us' },
        { label: '일본', value: 'jp' },
        { label: '중국', value: 'cn' },
        { label: '기타', value: 'other' },
      ],
    },
    
    // 다중 선택 셀렉트
    {
      type: 'select',
      name: 'skills',
      label: '보유 기술',
      multiple: true,
      placeholder: '기술을 선택하세요 (복수 선택 가능)',
      options: [
        { label: 'React', value: 'react' },
        { label: 'Vue.js', value: 'vue' },
        { label: 'Angular', value: 'angular' },
        { label: 'Node.js', value: 'nodejs' },
        { label: 'Python', value: 'python' },
        { label: 'Java', value: 'java' },
        { label: 'TypeScript', value: 'typescript' },
      ],
      description: '보유하고 있는 기술을 모두 선택해주세요',
    },
  ],
};`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          FieldOption 인터페이스
        </h2>
        <p className="text-gray-600 mb-4">선택 옵션을 정의하는 인터페이스:</p>

        <CodeBlock
          title="FieldOption 타입 정의"
          code={`interface FieldOption {
  label: string;    // 화면에 표시될 텍스트
  value: string;    // 실제 값
  disabled?: boolean; // 비활성화 여부
}

// 사용 예제
const options: FieldOption[] = [
  { label: '옵션 1', value: 'option1' },
  { label: '옵션 2', value: 'option2' },
  { label: '비활성화됨', value: 'disabled', disabled: true },
];`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          선택 필드 속성
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  속성
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  적용 필드
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
                <td className="px-4 py-2 text-sm text-gray-900">options</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  checkbox, radio, select
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  FieldOption[]
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  선택 가능한 옵션들
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">multiple</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  checkbox, select
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">boolean</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  다중 선택 허용
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">minSelected</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  checkbox (multiple)
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">number</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  최소 선택 개수
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">maxSelected</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  checkbox (multiple)
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">number</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  최대 선택 개수
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
