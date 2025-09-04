import type { GuideCategory } from './types';

export const guideCategories: GuideCategory[] = [
  {
    id: 'getting-started',
    title: '시작하기',
    description: '기본 설치와 사용법',
    sections: [
      {
        id: 'installation',
        title: '설치하기',
        description: 'FormGen 라이브러리 설치 방법',
        category: 'getting-started',
      },
      {
        id: 'basic-usage',
        title: '기본 사용법',
        description: '간단한 폼 생성하기',
        category: 'getting-started',
      },
      {
        id: 'language-setup',
        title: '언어 설정',
        description: '다국어 지원 설정하기',
        category: 'getting-started',
      },
    ],
  },
  {
    id: 'field-types',
    title: '필드 타입',
    description: '지원하는 필드 타입들',
    sections: [
      {
        id: 'text-fields',
        title: '텍스트 필드',
        description: 'text, email, password, textarea',
        category: 'field-types',
      },
      {
        id: 'number-fields',
        title: '숫자 필드',
        description: '숫자 입력 필드',
        category: 'field-types',
      },
      {
        id: 'choice-fields',
        title: '선택 필드',
        description: 'checkbox, radio, select',
        category: 'field-types',
      },
      {
        id: 'date-fields',
        title: '날짜 필드',
        description: '날짜 및 시간 입력',
        category: 'field-types',
      },
    ],
  },
  {
    id: 'layouts',
    title: '레이아웃',
    description: '폼 레이아웃 옵션',
    sections: [
      {
        id: 'basic-layout',
        title: '폼 레이아웃',
        description: 'Sections, Tabs, Accordion 레이아웃',
        category: 'layouts',
      },
    ],
  },
  {
    id: 'validation',
    title: '검증',
    description: '폼 검증과 커스터마이징',
    sections: [
      {
        id: 'field-comparison',
        title: '필드 비교',
        description: '필드 간 값 비교 검증',
        category: 'validation',
      },
    ],
  },
  {
    id: 'customization',
    title: '커스터마이징',
    description: '스타일과 동작 커스터마이징',
    sections: [
      {
        id: 'styling',
        title: '스타일링',
        description: 'CSS 클래스 커스터마이징',
        category: 'customization',
      },
      {
        id: 'conditional-fields',
        title: '조건부 필드',
        description: '필드 표시/숨김 조건',
        category: 'customization',
      },
    ],
  },
];
