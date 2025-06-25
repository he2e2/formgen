<div align=center>
<h1>FORMGEN</h1>

> 스키마 기반 React 폼 제너레이터 - 간단한 JSON 설정으로 완성되는 폼

**🚀 [라이브 데모 보기](https://formgen-xi.vercel.app/)** | **📦 [npm 패키지](https://www.npmjs.com/package/@formgen-he2e2/core)**

</div>

## ✨ 특징

- 🎯 **스키마 기반**: JSON 설정만으로 완성되는 폼
- 🛡️ **타입 안전**: Zod 유효성 검사와 TypeScript 지원
- ⚡ **빠른 개발**: 반복적인 폼 작성 작업 제거
- 🎨 **커스터마이징**: 독립적인 스타일 적용

## 🚀 빠른 시작

### 설치

```bash
npm install @formgen-he2e2/core
# 또는
pnpm add @formgen-he2e2/core
# 또는
yarn add @formgen-he2e2/core
```

### 기본 사용법

```typescript
import { FormGenerator, type FormSchema } from "@formgen-he2e2/core";
import "@formgen-he2e2/core/styles.css";
import { z } from "zod";

const schema: FormSchema = [
  { type: "text", name: "username", label: "사용자명", required: true },
  { type: "email", name: "email", label: "이메일", required: true },
  { type: "password", name: "password", label: "비밀번호", required: true },
];

const customValidation = z.object({
  username: z.string().min(3, "사용자명은 최소 3자 이상이어야 합니다"),
  email: z.string().email("올바른 이메일을 입력하세요"),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
});

function MyForm() {
  const handleSubmit = (data) => {
    console.log("폼 데이터:", data);
  };

  return (
    <FormGenerator
      schema={schema}
      customSchema={customValidation}
      onSubmit={handleSubmit}
    />
  );
}
```

## 📚 지원하는 필드 타입

| 타입     | 설명             | 예시               |
| -------- | ---------------- | ------------------ |
| text     | 기본 텍스트 입력 | 이름, 제목 등      |
| email    | 이메일 입력      | user@example.com   |
| password | 비밀번호 입력    | •••••••••          |
| number   | 숫자 입력        | 나이, 가격 등      |
| textarea | 긴 텍스트 입력   | 설명, 메모 등      |
| select   | 드롭다운 선택    | 옵션 목록에서 선택 |
| radio    | 라디오 버튼      | 단일 선택          |
| checkbox | 체크박스         | 다중 선택          |
| date     | 날짜 선택        | 2025-01-01         |

> 각 타입별 인터페이스는 [schema.ts](https://github.com/he2e2/formgen/blob/main/packages/core/src/types/schema.ts)에서 확인하실 수 있습니다.

## 🎨 고급 사용법

### 커스텀 스타일링

```typescript
const schema: FormSchema = [
  {
    type: 'text',
    name: 'username',
    label: '사용자명',
    wrapperClassName: 'custom-wrapper',
  },
];
```

### 복잡한 유효성 검사

```typescript
const validationSchema = z.object({
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      '대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다',
    ),
});
```

## 🎮 예제

### 회원가입 폼

```typescript
const signupSchema: FormSchema = [
  { type: 'text', name: 'name', label: '이름', required: true },
  { type: 'email', name: 'email', label: '이메일', required: true },
  { type: 'password', name: 'password', label: '비밀번호', required: true },
  {
    type: 'password',
    name: 'confirmPassword',
    label: '비밀번호 확인',
    required: true,
  },
  {
    type: 'select',
    name: 'age',
    label: '연령대',
    options: ['10대', '20대', '30대', '40대 이상'],
  },
  {
    type: 'checkbox',
    name: 'terms',
    label: '이용약관에 동의합니다',
    required: true,
  },
];
```

## 🛠️ 기술 스택

<img  src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img  src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img  src="https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"> <img  src="https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white"> <img  src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white">

## 🔗 링크

- [데모사이트](https://formgen-xi.vercel.app/)
- [npm 패키지](https://www.npmjs.com/package/@formgen-he2e2/core)
- [GitHub](https://github.com/he2e2/formgen)
- [이슈 리포트](https://github.com/he2e2/formgen/issues)
