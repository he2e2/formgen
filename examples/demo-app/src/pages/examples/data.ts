import type { Example, ExampleCategory } from './types';
import {
  SimpleFormExample,
  ComplexValidationExample,
  TabLayoutExample,
  AccordionLayoutExample,
} from './Examples';

export const examples: Example[] = [
  {
    id: 'simple-form',
    title: '기본 간단한 폼',
    description: '가장 기본적인 로그인/회원가입 스타일의 폼',
    category: 'basic',
    schema: null,
    component: SimpleFormExample,
  },
  {
    id: 'complex-validation',
    title: '복잡한 커스텀 validation',
    description: '다양한 검증 규칙과 필드 간 교차 검증이 포함된 폼',
    category: 'validation',
    schema: null,
    component: ComplexValidationExample,
  },
  {
    id: 'tab-layout',
    title: '탭 레이아웃 폼',
    description: '탭으로 그룹화된 다단계 폼',
    category: 'advanced',
    schema: null,
    component: TabLayoutExample,
  },
  {
    id: 'accordion-layout',
    title: '아코디언 레이아웃 폼',
    description: '접었다 펼 수 있는 아코디언 스타일의 그룹 폼',
    category: 'advanced',
    schema: null,
    component: AccordionLayoutExample,
  },
];

export const categories: ExampleCategory[] = [
  {
    id: 'basic',
    title: '기본 예제',
    description: '기본적인 폼 구성 예제들',
    examples: examples.filter((ex) => ex.category === 'basic'),
  },
  {
    id: 'advanced',
    title: '고급 예제',
    description: '복잡한 구조와 레이아웃을 가진 폼들',
    examples: examples.filter((ex) => ex.category === 'advanced'),
  },
  {
    id: 'validation',
    title: '유효성 검사',
    description: '복잡한 검증 로직을 가진 예제들',
    examples: examples.filter((ex) => ex.category === 'validation'),
  },
];
