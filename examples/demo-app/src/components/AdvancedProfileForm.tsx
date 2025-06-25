import { FormGenerator, type FormSchema } from '@formgen-he2e2/core';
import { z } from 'zod';
import { useState } from 'react';

const userProfileSchema: FormSchema = [
  {
    type: 'text',
    name: 'firstName',
    label: '이름',
    required: true,
    placeholder: '홍',
  },
  {
    type: 'text',
    name: 'lastName',
    label: '성',
    required: true,
    placeholder: '길동',
  },
  {
    type: 'email',
    name: 'email',
    label: '이메일 주소',
    required: true,
    placeholder: 'hong@example.com',
  },
  {
    type: 'password',
    name: 'password',
    label: '비밀번호',
    required: true,
    placeholder: '최소 8자, 특수문자 포함',
  },
  {
    type: 'date',
    name: 'birthDate',
    label: '생년월일',
    required: true,
    max: new Date().toISOString().split('T')[0],
  },
  {
    type: 'select',
    name: 'gender',
    label: '성별',
    options: [
      { label: '선택 안함', value: 'prefer_not_to_say' },
      { label: '남성', value: 'male' },
      { label: '여성', value: 'female' },
      { label: '기타', value: 'other' },
    ],
    placeholder: '성별을 선택하세요',
  },
  {
    type: 'text',
    name: 'phoneNumber',
    label: '전화번호',
    placeholder: '010-1234-5678',
    required: true,
  },
  {
    type: 'text',
    name: 'address',
    label: '주소',
    required: true,
    placeholder: '서울시 강남구 테헤란로 123',
  },
  {
    type: 'text',
    name: 'city',
    label: '도시',
    required: true,
    placeholder: '서울',
  },
  {
    type: 'text',
    name: 'zipCode',
    label: '우편번호',
    required: true,
    placeholder: '12345',
  },
  {
    type: 'checkbox',
    name: 'hobbies',
    label: '취미 (복수 선택 가능)',
    options: [
      { label: '독서', value: 'reading' },
      { label: '영화 감상', value: 'movies' },
      { label: '운동', value: 'sports' },
      { label: '음악 감상', value: 'music' },
      { label: '요리', value: 'cooking' },
      { label: '여행', value: 'travel' },
      { label: '게임', value: 'gaming' },
      { label: '사진', value: 'photography' },
    ],
    required: true,
  },
  {
    type: 'select',
    name: 'occupation',
    label: '직업 분야',
    options: [
      { label: '선택 안함', value: 'prefer_not_to_say' },
      { label: 'IT/소프트웨어', value: 'it' },
      { label: '교육', value: 'education' },
      { label: '의료', value: 'healthcare' },
      { label: '금융', value: 'finance' },
      { label: '예술/문화', value: 'arts' },
      { label: '서비스업', value: 'service' },
      { label: '제조업', value: 'manufacturing' },
      { label: '기타', value: 'other' },
    ],
    required: true,
  },
  {
    type: 'number',
    name: 'experience',
    label: '경력 (년)',
    min: 0,
    max: 50,
    placeholder: '5',
  },
  {
    type: 'select',
    name: 'salaryRange',
    label: '희망 연봉 범위',
    options: [
      { label: '2000만원 미만', value: 'under_20' },
      { label: '2000-3000만원', value: '20_30' },
      { label: '3000-4000만원', value: '30_40' },
      { label: '4000-5000만원', value: '40_50' },
      { label: '5000-7000만원', value: '50_70' },
      { label: '7000만원 이상', value: 'over_70' },
    ],
  },
  {
    type: 'radio',
    name: 'workStyle',
    label: '선호하는 근무 방식',
    options: [
      { label: '재택근무', value: 'remote' },
      { label: '사무실 근무', value: 'office' },
      { label: '하이브리드', value: 'hybrid' },
    ],
    required: true,
  },
  {
    type: 'textarea',
    name: 'bio',
    label: '자기소개',
    placeholder: '자신에 대해 간단히 소개해주세요 (최대 500자)',
    required: true,
  },
  {
    type: 'checkbox',
    name: 'agreements',
    label: '약관 동의',
    options: [
      { label: '서비스 이용약관 동의 (필수)', value: 'terms' },
      { label: '개인정보 처리방침 동의 (필수)', value: 'privacy' },
      { label: '마케팅 정보 수신 동의 (선택)', value: 'marketing' },
    ],
    required: true,
  },
];

const customValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, '이름을 입력하세요')
    .max(10, '이름은 10자 이하로 입력하세요')
    .regex(/^[가-힣a-zA-Z]+$/, '이름은 한글 또는 영문만 가능합니다'),

  lastName: z
    .string()
    .min(1, '성을 입력하세요')
    .max(10, '성은 10자 이하로 입력하세요')
    .regex(/^[가-힣a-zA-Z]+$/, '성은 한글 또는 영문만 가능합니다'),

  email: z
    .string()
    .email('올바른 이메일 주소를 입력하세요')
    .min(1, '이메일을 입력하세요'),

  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      '대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다'
    ),

  birthDate: z.string().min(1, '생년월일을 선택하세요'),

  gender: z.string().min(1, '성별을 선택하세요'),

  phoneNumber: z
    .string()
    .regex(
      /^010-\d{4}-\d{4}$/,
      '전화번호 형식이 올바르지 않습니다 (010-1234-5678)'
    ),

  address: z.string().min(5, '주소를 최소 5자 이상 입력하세요'),
  city: z.string().min(1, '도시를 입력하세요'),
  zipCode: z.string().regex(/^\d{5}$/, '우편번호는 5자리 숫자여야 합니다'),

  hobbies: z
    .array(z.string())
    .min(1, '최소 하나 이상의 취미를 선택하세요')
    .max(5, '최대 5개까지 선택 가능합니다'),

  occupation: z.string().min(1, '직업 분야를 선택하세요'),

  experience: z.coerce
    .number()
    .min(0, '경력은 0년 이상이어야 합니다')
    .max(50, '경력은 50년 이하여야 합니다')
    .optional(),

  salaryRange: z.string().optional(),
  workStyle: z.string().min(1, '근무 방식을 선택하세요'),

  bio: z
    .string()
    .min(10, '자기소개는 최소 10자 이상 입력하세요')
    .max(500, '자기소개는 500자 이하로 입력하세요'),

  agreements: z
    .array(z.string())
    .min(2, '필수 약관에 모두 동의해야 합니다')
    .refine(
      (arr) => arr.includes('terms') && arr.includes('privacy'),
      '서비스 이용약관과 개인정보 처리방침에 동의해야 합니다'
    ),
});

export const AdvancedProfileForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = (data: any) => {
    console.log('🚀 사용자 프로필 데이터:', data);

    const summary = {
      개인정보: {
        이름: `${data.lastName}${data.firstName}`,
        이메일: data.email,
        생년월일: data.birthDate,
        성별: data.gender,
        전화번호: data.phoneNumber,
      },
      주소정보: {
        주소: data.address,
        도시: data.city,
        우편번호: data.zipCode,
      },
      취미: data.hobbies?.join(', ') || '없음',
      직업정보: {
        분야: data.occupation,
        경력: data.experience ? `${data.experience}년` : '신입',
        희망연봉: data.salaryRange || '미정',
        근무방식: data.workStyle,
      },
      자기소개: data.bio,
      동의사항: data.agreements?.join(', ') || '없음',
    };

    setSubmittedData(summary);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <svg
                className="h-8 w-8 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800">
                ✅ 프로필 생성 완료!
              </h3>
              <p className="text-green-700">
                사용자 프로필이 성공적으로 생성되었습니다.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-md p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              📊 제출된 데이터 요약:
            </h4>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-auto">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>

          <button onClick={resetForm} className="btn btn-primary">
            새로운 프로필 생성하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 my-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🚀 고급 사용자 프로필 생성
        </h1>
        <p className="text-gray-600">
          복잡한 유효성 검사와 다양한 필드 타입이 포함된 폼 예제입니다.
        </p>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            💡 포함된 고급 기능:
          </h3>
          <div className="text-sm text-blue-700 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>• 정규표현식 유효성 검사</div>
            <div>• 조건부 필수 검증 (약관 동의)</div>
            <div>• 배열 데이터 최소/최대 제한</div>
            <div>• 커스텀 Tailwind 스타일링</div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-8">
        <FormGenerator
          schema={userProfileSchema}
          customSchema={customValidationSchema}
          onSubmit={handleSubmit}
          fieldWrapperClassName="mb-6"
          fieldsetClassName="border border-gray-200 rounded-lg p-4"
          legendClassName="text-lg font-semibold text-gray-800 px-2"
          labelClassName="text-sm font-medium text-gray-700 mb-2"
          inputClassName="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          errorClassName="mt-1 text-sm text-red-600"
          buttonClassName="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
        />
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>💡 이 폼은 FormGen 라이브러리의 모든 기능을 보여주는 데모입니다.</p>
        <p className="mt-1">
          실제 데이터는 브라우저 콘솔에서 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
};
