import React from 'react';
import { CodeBlock } from '../../../components';

export const StylingContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">스타일링</h1>
    <p className="text-lg text-gray-600 mb-6">
      FormGen의 모든 요소를 커스터마이징하는 방법을 알아보세요.
    </p>

    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          className Props
        </h2>
        <p className="text-gray-600 mb-4">
          각 요소에 CSS 클래스를 적용할 수 있습니다:
        </p>

        <CodeBlock
          title="스타일링 예제"
          code={`<FormGenerator
  schema={schema}
  className={{
    // 폼 전체 컨테이너
    form: 'space-y-6 p-6 bg-white rounded-lg shadow-lg',
    
    // 필드 래퍼
    fieldWrapper: 'mb-4',
    
    // 라벨
    label: 'block text-sm font-medium text-gray-700 mb-2',
    
    // 입력 필드
    input: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500',
    
    // 에러 메시지
    error: 'mt-1 text-sm text-red-600',
    
    // 제출 버튼
    button: 'w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700',
    
    // 그룹 관련
    group: 'bg-gray-50 border border-gray-200 rounded-lg p-6',
    groupTitle: 'text-lg font-semibold text-gray-800 mb-2',
    groupDescription: 'text-sm text-gray-600 mb-4',
    
    // 탭 레이아웃
    tabList: 'flex border-b border-gray-200',
    tab: 'px-6 py-3 text-sm font-medium',
    tabActive: 'border-b-2 border-blue-500 text-blue-600',
    tabInactive: 'text-gray-500 hover:text-gray-700',
    
    // 아코디언 레이아웃
    accordionItem: 'border border-gray-200 rounded-lg overflow-hidden',
    accordionHeader: 'w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100',
    accordionContent: 'p-6 space-y-4',
  }}
/>`}
        />
      </div>
    </div>
  </div>
);
