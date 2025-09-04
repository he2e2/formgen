import React from 'react';
import { CodeBlock } from '../../../components';

export const LayoutContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">폼 레이아웃</h1>
    <p className="text-lg text-gray-600 mb-6">
      FormGen이 지원하는 3가지 레이아웃 타입과 설정 방법을 알아보세요.
    </p>

    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          레이아웃 타입 개요
        </h2>
        <p className="text-gray-600 mb-4">
          FormGen은 다음 3가지 레이아웃을 지원합니다:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">
              Sections (기본)
            </h3>
            <p className="text-sm text-blue-600">
              필드 그룹을 세로로 나열하는 기본 레이아웃
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Tabs</h3>
            <p className="text-sm text-green-600">
              그룹을 탭으로 구분하여 한 번에 하나씩 표시
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">Accordion</h3>
            <p className="text-sm text-purple-600">
              접을 수 있는 섹션으로 공간을 절약
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          레이아웃 설정 방법
        </h2>
        <p className="text-gray-600 mb-4">
          스키마의 settings.groupLayout 속성으로 레이아웃을 변경할 수 있습니다:
        </p>

        <CodeBlock
          title="레이아웃 설정 기본 구조"
          code={`const layoutSchema: FormSchema = {
  groups: [
    {
      id: 'group1',
      title: '그룹 1',
      fields: [/* 필드들 */],
    },
    {
      id: 'group2', 
      title: '그룹 2',
      fields: [/* 필드들 */],
    },
  ],
  settings: {
    groupLayout: 'sections', // 'sections' | 'tabs' | 'accordion'
    validateOnChange: true,
    validateOnBlur: true,
    showOptionalLabel: true,
  },
};`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          1. Sections 레이아웃 (기본)
        </h2>
        <p className="text-gray-600 mb-4">
          필드 그룹들을 세로로 나열하는 가장 기본적인 레이아웃입니다:
        </p>

        <CodeBlock
          title="Sections 레이아웃 예제"
          code={`const sectionsLayoutSchema: FormSchema = {
  groups: [
    {
      id: 'personal',
      title: '개인 정보',
      description: '기본적인 개인 정보를 입력해주세요',
      fields: [
        { type: 'text', name: 'name', label: '이름', required: true },
        { type: 'email', name: 'email', label: '이메일', required: true },
      ],
    },
    {
      id: 'preferences',
      title: '환경 설정',
      description: '개인화 설정을 구성해주세요',
      fields: [
        { type: 'checkbox', name: 'newsletter', label: '뉴스레터 구독' },
        { type: 'radio', name: 'theme', label: '테마', options: [
          { label: '라이트', value: 'light' },
          { label: '다크', value: 'dark' },
        ]},
      ],
    },
  ],
  settings: {
    groupLayout: 'sections', // 또는 생략 (기본값)
  },
};

// 사용법
<FormGenerator
  schema={sectionsLayoutSchema}
  onSubmit={(data) => console.log(data)}
/>`}
        />

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
          <h4 className="font-semibold text-gray-800 mb-2">
            Sections 레이아웃 특징:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 모든 그룹이 한 번에 표시됨</li>
            <li>• 그룹별로 제목과 설명이 명확히 구분됨</li>
            <li>• 스크롤하여 전체 폼을 한눈에 볼 수 있음</li>
            <li>• 짧은 폼이나 단계적 작성이 필요 없는 경우 적합</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          2. Tabs 레이아웃
        </h2>
        <p className="text-gray-600 mb-4">
          각 그룹을 탭으로 구분하여 한 번에 하나의 그룹만 표시합니다:
        </p>

        <CodeBlock
          title="Tabs 레이아웃 예제"
          code={`const tabsLayoutSchema: FormSchema = {
  groups: [
    {
      id: 'step1',
      title: '기본 정보',
      description: '1단계: 기본 정보를 입력해주세요',
      required: true, // 필수 그룹 표시
      fields: [
        { type: 'text', name: 'name', label: '이름', required: true },
        { type: 'email', name: 'email', label: '이메일', required: true },
      ],
    },
    {
      id: 'step2',
      title: '상세 정보',
      description: '2단계: 추가 정보를 입력해주세요',
      fields: [
        { type: 'date', name: 'birthDate', label: '생년월일' },
        { type: 'select', name: 'country', label: '국가', options: [
          { label: '대한민국', value: 'kr' },
          { label: '미국', value: 'us' },
        ]},
      ],
    },
    {
      id: 'step3',
      title: '완료',
      description: '3단계: 설정을 완료해주세요',
      fields: [
        { type: 'checkbox', name: 'agree', label: '이용약관 동의', required: true },
        { type: 'checkbox', name: 'newsletter', label: '뉴스레터 구독' },
      ],
    },
  ],
  settings: {
    groupLayout: 'tabs',
    validateOnChange: true, // 탭 전환 시 검증 수행
  },
};

// 사용법
<FormGenerator
  schema={tabsLayoutSchema}
  onSubmit={(data) => console.log('전체 데이터:', data)}
/>`}
        />

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
          <h4 className="font-semibold text-gray-800 mb-2">
            Tabs 레이아웃 특징:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 단계별 폼 작성에 적합</li>
            <li>• 화면 공간을 효율적으로 사용</li>
            <li>• 긴 폼을 논리적 단계로 나눌 때 유용</li>
            <li>• 사용자가 현재 진행 단계를 명확히 인식</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          3. Accordion 레이아웃
        </h2>
        <p className="text-gray-600 mb-4">
          그룹을 접을 수 있는 아코디언 형태로 표시합니다:
        </p>

        <CodeBlock
          title="Accordion 레이아웃 예제"
          code={`const accordionLayoutSchema: FormSchema = {
  groups: [
    {
      id: 'account',
      title: '계정 설정',
      description: '기본 계정 정보를 설정해주세요',
      collapsible: true,
      collapsed: false, // 기본적으로 열려있음
      required: true,
      fields: [
        { type: 'text', name: 'username', label: '사용자명', required: true },
        { type: 'password', name: 'password', label: '비밀번호', required: true },
      ],
    },
    {
      id: 'profile',
      title: '프로필 정보',
      description: '선택적으로 프로필을 설정할 수 있습니다',
      collapsible: true,
      collapsed: true, // 기본적으로 접혀있음
      fields: [
        { type: 'text', name: 'displayName', label: '표시 이름' },
        { type: 'textarea', name: 'bio', label: '소개' },
      ],
    },
    {
      id: 'notifications',
      title: '알림 설정',
      description: '알림 관련 설정을 구성해주세요',
      collapsible: true,
      collapsed: true,
      fields: [
        { type: 'checkbox', name: 'emailNotif', label: '이메일 알림' },
        { type: 'checkbox', name: 'pushNotif', label: '푸시 알림' },
      ],
    },
  ],
  settings: {
    groupLayout: 'accordion',
    validateOnChange: true,
  },
};

// 사용법
<FormGenerator
  schema={accordionLayoutSchema}
  onSubmit={(data) => console.log(data)}
  className={{
    accordionItem: 'border border-gray-200 rounded-lg overflow-hidden mb-2',
    accordionHeader: 'w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 font-medium flex justify-between items-center',
    accordionContent: 'p-4 space-y-4 bg-white',
  }}
/>`}
        />

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
          <h4 className="font-semibold text-gray-800 mb-2">
            Accordion 레이아웃 특징:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 필수 섹션과 선택 섹션을 구분할 때 유용</li>
            <li>• 화면 공간을 절약하면서도 전체 구조를 보여줌</li>
            <li>• 사용자가 관심 있는 섹션만 열어서 작성 가능</li>
            <li>• collapsed 속성으로 초기 상태 제어</li>
            <li>• 설정 페이지나 상세 옵션이 많은 폼에 적합</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          레이아웃 선택 가이드
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  레이아웃
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  적합한 상황
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  장점
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                  단점
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                  Sections
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  • 짧은 폼<br />• 한번에 모든 정보 입력
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  • 전체 구조 파악 용이
                  <br />• 빠른 작성
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  • 스크롤 많음
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                  Tabs
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  • 단계별 진행
                  <br />• 긴 폼을 논리적 구분
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  • 집중도 높음
                  <br />• 진행 상황 명확
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  • 전체 구조 파악 어려움
                  <br />• 탭 전환 필요
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                  Accordion
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  • 선택적 섹션 많음
                  <br />• 설정/환경설정
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  • 공간 효율적
                  <br />• 선택적 작성
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  • 숨겨진 필드 놓치기 쉬움
                  <br />• 접기/펼치기 번거로움
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          레이아웃 스타일링
        </h2>
        <p className="text-gray-600 mb-4">
          각 레이아웃별로 제공되는 CSS 클래스:
        </p>

        <CodeBlock
          title="레이아웃별 className 옵션"
          code={`// 공통 클래스
const commonClasses = {
  form: 'space-y-6',
  group: 'border border-gray-200 rounded-lg p-6',
  groupTitle: 'text-lg font-semibold mb-2',
  groupDescription: 'text-sm text-gray-600 mb-4',
};

// Tabs 전용 클래스
const tabClasses = {
  ...commonClasses,
  tabList: 'flex border-b border-gray-200 mb-6',
  tab: 'px-4 py-2 text-sm font-medium cursor-pointer',
  tabActive: 'border-b-2 border-blue-500 text-blue-600',
  tabInactive: 'text-gray-500 hover:text-gray-700',
  tabPanel: 'space-y-4',
};

// Accordion 전용 클래스  
const accordionClasses = {
  ...commonClasses,
  accordionItem: 'border border-gray-200 rounded-lg overflow-hidden mb-2',
  accordionHeader: 'w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100',
  accordionContent: 'p-4 space-y-4',
  accordionIcon: 'ml-2 transition-transform duration-200',
};

// 사용 예제
<FormGenerator
  schema={schema}
  className={tabClasses} // 또는 accordionClasses
/>`}
        />
      </div>
    </div>
  </div>
);
