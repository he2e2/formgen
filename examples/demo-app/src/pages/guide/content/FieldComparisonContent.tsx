import React from 'react';
import { CodeBlock } from '../../../components';

export const FieldComparisonContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">필드 비교</h1>
    <p className="text-lg text-gray-600 mb-6">
      필드 간 값을 비교하여 검증하는 compareWith 기능의 사용법을 알아보세요.
    </p>

    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          FieldComparison 인터페이스
        </h2>
        <p className="text-gray-600 mb-4">
          필드 비교 검증을 위한 설정 인터페이스:
        </p>

        <CodeBlock
          title="FieldComparison 타입 정의"
          code={`interface FieldComparison {
  type: 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'custom';
  targetField: string;
  message?: string;
  customValidator?: (value: any, targetValue: any) => boolean;
}

// 사용 예제
const fieldWithComparison = {
  type: 'password',
  name: 'confirmPassword',
  label: '비밀번호 확인',
  required: true,
  compareWith: {
    type: 'equals',
    targetField: 'password',
    message: '비밀번호가 일치하지 않습니다',
  },
};`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          비교 타입별 사용 예제
        </h2>
        <p className="text-gray-600 mb-4">다양한 비교 타입의 실제 사용 사례:</p>

        <CodeBlock
          title="비교 타입별 예제"
          code={`const fieldComparisonSchema: FormSchema = {
  groups: [
    {
      id: 'password-section',
      title: '비밀번호 설정',
      fields: [
        {
          type: 'password',
          name: 'password',
          label: '새 비밀번호',
          required: true,
          minLength: 8,
          placeholder: '8자 이상 입력하세요',
        },
        
        // equals 비교 - 비밀번호 확인
        {
          type: 'password',
          name: 'confirmPassword',
          label: '비밀번호 확인',
          required: true,
          placeholder: '비밀번호를 다시 입력하세요',
          compareWith: {
            type: 'equals',
            targetField: 'password',
            message: '비밀번호가 일치하지 않습니다',
          },
        },
      ],
    },
    
    {
      id: 'range-section', 
      title: '범위 설정',
      fields: [
        {
          type: 'number',
          name: 'minPrice',
          label: '최소 가격',
          required: true,
          min: 0,
          placeholder: '최소 가격을 입력하세요',
        },
        
        // greater-than 비교 - 최대값이 최소값보다 커야 함
        {
          type: 'number',
          name: 'maxPrice',
          label: '최대 가격',
          required: true,
          placeholder: '최대 가격을 입력하세요',
          compareWith: {
            type: 'greater-than',
            targetField: 'minPrice',
            message: '최대 가격은 최소 가격보다 커야 합니다',
          },
        },
      ],
    },
    
    {
      id: 'date-range-section',
      title: '기간 설정',
      fields: [
        {
          type: 'date',
          name: 'startDate',
          label: '시작일',
          required: true,
          format: 'date',
          min: new Date().toISOString().split('T')[0],
        },
        
        // greater-than 비교 - 종료일이 시작일 이후여야 함
        {
          type: 'date',
          name: 'endDate',
          label: '종료일',
          required: true,
          format: 'date',
          compareWith: {
            type: 'greater-than',
            targetField: 'startDate',
            message: '종료일은 시작일 이후여야 합니다',
          },
        },
      ],
    },
    
    {
      id: 'age-section',
      title: '나이 제한',
      fields: [
        {
          type: 'number',
          name: 'userAge',
          label: '사용자 나이',
          required: true,
          min: 1,
          max: 120,
        },
        
        // less-than 비교 - 보호자 나이가 사용자보다 많아야 함
        {
          type: 'number',
          name: 'guardianAge',
          label: '보호자 나이',
          min: 18,
          max: 120,
          showWhen: {
            when: 'userAge',
            is: 18,
            operator: 'less-than',
          },
          compareWith: {
            type: 'greater-than',
            targetField: 'userAge',
            message: '보호자 나이는 사용자보다 많아야 합니다',
          },
        },
      ],
    },
  ],
};`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          커스텀 비교 검증
        </h2>
        <p className="text-gray-600 mb-4">
          복잡한 비교 로직을 위한 custom 타입 사용:
        </p>

        <CodeBlock
          title="커스텀 비교 검증 예제"
          code={`const customComparisonSchema: FormSchema = {
  groups: [],
  ungroupedFields: [
    {
      type: 'email',
      name: 'email',
      label: '이메일',
      required: true,
      placeholder: 'user@example.com',
    },
    
    // 커스텀 비교 - 이메일 도메인이 같아야 함
    {
      type: 'email',
      name: 'confirmEmail',
      label: '이메일 확인',
      required: true,
      placeholder: 'user@example.com',
      compareWith: {
        type: 'custom',
        targetField: 'email',
        message: '같은 도메인의 이메일을 입력해주세요',
        customValidator: (confirmEmail, originalEmail) => {
          if (!confirmEmail || !originalEmail) return true;
          
          const getDomain = (email: string) => email.split('@')[1];
          return getDomain(confirmEmail) === getDomain(originalEmail);
        },
      },
    },
    
    {
      type: 'text',
      name: 'username',
      label: '사용자명',
      required: true,
      minLength: 3,
    },
    
    // 커스텀 비교 - 사용자명과 다른 값이어야 함
    {
      type: 'text',
      name: 'displayName',
      label: '표시 이름',
      required: true,
      compareWith: {
        type: 'custom',
        targetField: 'username',
        message: '표시 이름은 사용자명과 달라야 합니다',
        customValidator: (displayName, username) => {
          if (!displayName || !username) return true;
          return displayName.toLowerCase() !== username.toLowerCase();
        },
      },
    },
    
    {
      type: 'number',
      name: 'score1',
      label: '첫 번째 점수',
      required: true,
      min: 0,
      max: 100,
    },
    
    {
      type: 'number',
      name: 'score2', 
      label: '두 번째 점수',
      required: true,
      min: 0,
      max: 100,
    },
    
    // 커스텀 비교 - 두 점수의 합이 특정 범위 내에 있어야 함
    {
      type: 'number',
      name: 'totalScore',
      label: '총점',
      required: true,
      compareWith: {
        type: 'custom',
        targetField: 'score1', // 여러 필드와 비교할 때는 대표 필드 지정
        message: '총점은 두 점수의 합과 일치해야 합니다',
        customValidator: (totalScore, score1) => {
          // 실제로는 모든 폼 데이터에 접근이 가능하다고 가정
          // 여기서는 간단히 구현
          return true; // 실제 구현에서는 복잡한 로직 사용
        },
      },
    },
  ],
};`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          비교 검증과 Zod 조합
        </h2>
        <p className="text-gray-600 mb-4">
          compareWith와 Zod 검증을 함께 사용하는 방법:
        </p>

        <CodeBlock
          title="compareWith + Zod 검증"
          code={`import { z } from 'zod';

// 스키마에서 compareWith 사용
const schemaWithComparison: FormSchema = {
  groups: [],
  ungroupedFields: [
    {
      type: 'password',
      name: 'password',
      label: '비밀번호',
      required: true,
      minLength: 8,
    },
    {
      type: 'password',
      name: 'confirmPassword',
      label: '비밀번호 확인',
      required: true,
      compareWith: {
        type: 'equals',
        targetField: 'password',
        message: '비밀번호가 일치하지 않습니다',
      },
    },
  ],
};

// Zod에서 추가 검증
const zodWithComparison = z.object({
  password: z.string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .regex(/^(?=.*[a-z])/, '소문자를 포함해야 합니다')
    .regex(/^(?=.*[A-Z])/, '대문자를 포함해야 합니다')
    .regex(/^(?=.*\\d)/, '숫자를 포함해야 합니다'),
    
  confirmPassword: z.string()
    .min(1, '비밀번호 확인을 입력해주세요'),
}).refine((data) => {
  // Zod 레벨에서도 비교 검증 (이중 검증)
  return data.password === data.confirmPassword;
}, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"], // 에러가 표시될 필드
});

// 사용 예제
<FormGenerator
  schema={schemaWithComparison}
  customSchema={zodWithComparison}
  onSubmit={(data) => {
    console.log('검증된 데이터:', data);
    // { password: "SecurePass123", confirmPassword: "SecurePass123" }
  }}
/>`}
        />
      </div>
    </div>
  </div>
);
