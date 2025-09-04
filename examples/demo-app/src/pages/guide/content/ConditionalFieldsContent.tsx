import React from 'react';
import { CodeBlock } from '../../../components';

export const ConditionalFieldsContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">조건부 필드</h1>
    <p className="text-lg text-gray-600 mb-6">
      showWhen 조건을 사용하여 특정 조건에 따라 필드를 동적으로 표시하거나
      숨기는 방법을 알아보세요.
    </p>

    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          FieldCondition 인터페이스
        </h2>
        <p className="text-gray-600 mb-4">
          조건부 필드 표시를 위한 설정 인터페이스:
        </p>

        <CodeBlock
          title="FieldCondition 타입 정의"
          code={`interface FieldCondition {
  when: string;    // 참조할 필드 이름
  is: any;         // 비교할 값
  operator?: 'equals' | 'not-equals' | 'contains' | 'greater-than' | 'less-than';
}

// 기본 사용법
const conditionalField = {
  type: 'text',
  name: 'companyName',
  label: '회사명',
  required: true,
  showWhen: {
    when: 'accountType',     // 'accountType' 필드를 확인
    is: 'business',          // 값이 'business'일 때
    operator: 'equals',      // 일치하면 (기본값)
  },
};`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          연산자별 사용 예제
        </h2>
        <p className="text-gray-600 mb-4">
          다양한 비교 연산자를 사용한 조건부 필드:
        </p>

        <CodeBlock
          title="연산자별 조건부 필드 예제"
          code={`const conditionalFieldsSchema: FormSchema = {
  groups: [],
  ungroupedFields: [
    // 기준 필드들
    {
      type: 'select',
      name: 'accountType',
      label: '계정 유형',
      required: true,
      options: [
        { label: '개인', value: 'personal' },
        { label: '기업', value: 'business' },
        { label: '비영리', value: 'nonprofit' },
      ],
    },
    
    {
      type: 'number',
      name: 'teamSize',
      label: '팀 크기',
      min: 1,
      max: 1000,
    },
    
    {
      type: 'checkbox',
      name: 'features',
      label: '필요한 기능',
      multiple: true,
      options: [
        { label: 'API 접근', value: 'api' },
        { label: '고급 분석', value: 'analytics' },
        { label: '우선 지원', value: 'support' },
      ],
    },
    
    // equals 연산자 (기본값)
    {
      type: 'text',
      name: 'companyName',
      label: '회사명',
      required: true,
      showWhen: {
        when: 'accountType',
        is: 'business',
        operator: 'equals', // 또는 생략 가능
      },
    },
    
    // not-equals 연산자
    {
      type: 'text',
      name: 'personalBio',
      label: '개인 소개',
      showWhen: {
        when: 'accountType',
        is: 'business',
        operator: 'not-equals', // business가 아닌 경우
      },
    },
    
    // greater-than 연산자
    {
      type: 'select',
      name: 'managementTool',
      label: '관리 도구',
      options: [
        { label: 'Slack', value: 'slack' },
        { label: 'Teams', value: 'teams' },
        { label: 'Discord', value: 'discord' },
      ],
      showWhen: {
        when: 'teamSize',
        is: 5,
        operator: 'greater-than', // 팀 크기가 5명 초과일 때
      },
    },
    
    // less-than 연산자
    {
      type: 'checkbox',
      name: 'startupProgram',
      label: '스타트업 프로그램 참여',
      showWhen: {
        when: 'teamSize',
        is: 10,
        operator: 'less-than', // 팀 크기가 10명 미만일 때
      },
    },
    
    // contains 연산자 (배열에서 특정 값 포함)
    {
      type: 'text',
      name: 'apiKey',
      label: 'API 키',
      showWhen: {
        when: 'features',
        is: 'api',
        operator: 'contains', // 'api'가 선택된 경우
      },
    },
    
    {
      type: 'select',
      name: 'analyticsLevel',
      label: '분석 레벨',
      options: [
        { label: '기본', value: 'basic' },
        { label: '고급', value: 'advanced' },
        { label: '프리미엄', value: 'premium' },
      ],
      showWhen: {
        when: 'features',
        is: 'analytics',
        operator: 'contains',
      },
    },
  ],
};`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          그룹 레벨 조건부 표시
        </h2>
        <p className="text-gray-600 mb-4">
          필드뿐만 아니라 전체 그룹도 조건에 따라 표시/숨김 가능:
        </p>

        <CodeBlock
          title="조건부 그룹 예제"
          code={`const conditionalGroupSchema: FormSchema = {
  groups: [
    {
      id: 'user-type',
      title: '사용자 유형',
      fields: [
        {
          type: 'radio',
          name: 'userType',
          label: '사용자 유형을 선택해주세요',
          required: true,
          options: [
            { label: '개발자', value: 'developer' },
            { label: '디자이너', value: 'designer' },
            { label: '마케터', value: 'marketer' },
            { label: '기타', value: 'other' },
          ],
        },
      ],
    },
    
    // 개발자일 때만 표시되는 그룹
    {
      id: 'developer-info',
      title: '개발자 정보',
      description: '개발 관련 정보를 입력해주세요',
      showWhen: {
        when: 'userType',
        is: 'developer',
      },
      fields: [
        {
          type: 'checkbox',
          name: 'programmingLanguages',
          label: '사용 가능한 프로그래밍 언어',
          multiple: true,
          options: [
            { label: 'JavaScript', value: 'js' },
            { label: 'TypeScript', value: 'ts' },
            { label: 'Python', value: 'python' },
            { label: 'Java', value: 'java' },
            { label: 'Go', value: 'go' },
          ],
        },
        {
          type: 'number',
          name: 'yearsOfExperience',
          label: '개발 경력 (년)',
          min: 0,
          max: 50,
        },
      ],
    },
    
    // 디자이너일 때만 표시되는 그룹
    {
      id: 'designer-info',
      title: '디자이너 정보',
      description: '디자인 관련 정보를 입력해주세요',
      showWhen: {
        when: 'userType',
        is: 'designer',
      },
      fields: [
        {
          type: 'checkbox',
          name: 'designTools',
          label: '사용 가능한 디자인 도구',
          multiple: true,
          options: [
            { label: 'Figma', value: 'figma' },
            { label: 'Sketch', value: 'sketch' },
            { label: 'Adobe XD', value: 'xd' },
            { label: 'Photoshop', value: 'photoshop' },
            { label: 'Illustrator', value: 'illustrator' },
          ],
        },
        {
          type: 'select',
          name: 'designSpecialty',
          label: '전문 분야',
          options: [
            { label: 'UI/UX 디자인', value: 'uiux' },
            { label: '그래픽 디자인', value: 'graphic' },
            { label: '브랜딩', value: 'branding' },
            { label: '일러스트레이션', value: 'illustration' },
          ],
        },
      ],
    },
    
    // 기타 선택 시만 표시
    {
      id: 'other-info',
      title: '기타 정보',
      showWhen: {
        when: 'userType',
        is: 'other',
      },
      fields: [
        {
          type: 'text',
          name: 'jobTitle',
          label: '직업/직책',
          required: true,
        },
        {
          type: 'textarea',
          name: 'description',
          label: '상세 설명',
          placeholder: '어떤 일을 하시는지 자세히 알려주세요',
        },
      ],
    },
  ],
  settings: {
    groupLayout: 'sections',
  },
};`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          조건부 필드 모범 사례
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">권장사항:</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              • <strong>명확한 조건 설정:</strong> 사용자가 예상할 수 있는
              논리적 조건 사용
            </li>
            <li>
              • <strong>단계적 공개:</strong> 너무 많은 필드를 한 번에 숨기지
              말고 단계적으로 표시
            </li>
            <li>
              • <strong>필수 필드 주의:</strong> 조건부 필수 필드는 조건이
              만족될 때만 검증되도록 설정
            </li>
            <li>
              • <strong>사용자 피드백:</strong> 필드가 왜 나타났는지 설명하는
              description 활용
            </li>
            <li>
              • <strong>테스트:</strong> 다양한 조건 조합을 테스트하여 예상치
              못한 동작 방지
            </li>
          </ul>

          <h4 className="font-semibold text-gray-800 mb-3 mt-4">주의사항:</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              • <strong>순환 참조 방지:</strong> 필드 A가 B를 참조하고 B가 A를
              참조하는 구조 금지
            </li>
            <li>
              • <strong>깊은 중첩 제한:</strong> 3단계 이상의 깊은 중첩은 사용자
              경험에 부정적
            </li>
            <li>
              • <strong>성능 고려:</strong> 복잡한 조건은 폼 렌더링 성능에
              영향을 줄 수 있음
            </li>
            <li>
              • <strong>접근성:</strong> 스크린 리더 등 보조 기술에서도 조건부
              표시가 잘 작동하는지 확인
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);
