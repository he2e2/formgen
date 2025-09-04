<div align=center>
<img width="962" alt="Image" src="https://github.com/user-attachments/assets/4f4b9dc8-4657-49e3-a085-679a76b2e484" />
</div>

<div align=center>

> スキーマベースの React フォームジェネレーター - シンプルな JSON 設定で完成するフォーム

**🚀 [ライブデモ](https://formgen-xi.vercel.app/)** | **📦 [npm パッケージ](https://www.npmjs.com/package/@formgen-he2e2/core)**

## 🌐 言語

[English](./README.md) | [한국어](./README.ko.md)

</div>

## ✨ 特徴

- 🎯 **スキーマベース**: JSON 設定のみで完成するフォーム
- 🛡️ **型安全性**: Zod バリデーションと TypeScript サポート
- ⚡ **高速開発**: 繰り返しフォーム作成の排除
- 🎨 **カスタマイズ可能**: 独立したスタイリング
- 🌍 **i18n 対応**: 多言語フォームバリデーション（新機能！）

## 🚀 クイックスタート

### インストール

```bash
npm install @formgen-he2e2/core
# または
pnpm add @formgen-he2e2/core
# または
yarn add @formgen-he2e2/core
```

### 基本的な使用法

```typescript
import { FormGenerator, type FormSchema } from "@formgen-he2e2/core";
import "@formgen-he2e2/core/styles.css";

const schema: FormSchema = {
  groups: [],
  ungroupedFields: [
    { type: "text", name: "username", label: "Username", required: true },
    { type: "email", name: "email", label: "Email", required: true },
    { type: "password", name: "password", label: "Password", required: true },
  ],
};

function MyForm() {
  const handleSubmit = (data) => {
    console.log("フォームデータ:", data);
  };

  return (
    <FormGenerator
      schema={schema}
      onSubmit={handleSubmit}
      language="ja" // 言語を手動設定
    />
  );
}
```

## 🌍 多言語サポート（新機能！）

FormGen は、ブラウザ言語の自動検出とともに 3 つの言語をサポートします：

```typescript
// ブラウザ言語の自動検出
<FormGenerator schema={schema} onSubmit={handleSubmit} />

// 言語の手動設定
<FormGenerator
  schema={schema}
  onSubmit={handleSubmit}
  language="ja" // ja | ko | en
/>
```

Supported Languages:

- 🇯🇵 日本語 (ja)
- 🇺🇸 English (en)
- 🇰🇷 한국어 (ko)

## 📚 サポートされているフィールドタイプ

| タイプ   | 説明               | 例                 |
| -------- | ------------------ | ------------------ |
| text     | 基本テキスト入力   | 名前、タイトルなど |
| email    | メール入力         | user@example.com   |
| password | パスワード入力     | •••••••••          |
| number   | 数値入力           | 年齢、価格など     |
| textarea | 長いテキスト入力   | 説明、メモなど     |
| select   | ドロップダウン選択 | オプションから選択 |
| radio    | ラジオボタン       | 単一選択           |
| checkbox | チェックボックス   | 複数選択           |
| date     | 日付ピッカー       | 2025-01-01         |

> 各タイプの詳細なインターフェースは [Live Demo](https://formgen-xi.vercel.app/)で確認できます。

## 🎨 高度な使用方法

### カスタムスタイリング

```typescript
<FormGenerator
  schema={schema}
  className={{
    form: "",
    fieldWrapper: "",
    label: "",
    input: "",
    error: "",
    button: "",
    group: "",
    groupTitle: "",
    groupDescription: "",
    tabList: "",
    tab: "",
    tabActive: "",
    tabInactive: "",
    accordionItem: "",
    accordionHeader: "",
    accordionContent: "",
  }}
/>
```

### 複雑なバリデーション

```typescript
const validationSchema = z.object({
  password: z
    .string()
    .min(8, "パスワードは8文字以上入力してください")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "大文字、小文字、数字、特殊文字をそれぞれ1つ以上含む必要があります"
    ),
});
```

## 🎮 例

### 会員登録フォーム

> 複雑な例は [デモサイト](https://formgen-xi.vercel.app/)で確認してください。

```typescript
const signupSchema: FormSchema = {
  groups: [],
  ungroupedFields: [
    { type: "text", name: "name", label: "Name", required: true },
    { type: "email", name: "email", label: "Email", required: true },
    { type: "password", name: "password", label: "Password", required: true },
    {
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
      required: true,
    },
    {
      type: "select",
      name: "age",
      label: "Age Group",
      options: [
        { value: "10s", label: "Teens" },
        { value: "20s", label: "20s" },
        { value: "30s", label: "30s" },
        { value: "40+", label: "40+" },
      ],
    },
    {
      type: "checkbox",
      name: "terms",
      label: "I agree to the terms of service",
      required: true,
    },
  ],
};
```

<table align="center">
  <tr>
    <td><img width="500" alt="Image" src="https://github.com/user-attachments/assets/7722f726-e645-4a35-ad31-d1f67829b066" /></td>
    <td><img width="500" alt="Image" src="https://github.com/user-attachments/assets/f18091da-cbc4-43ae-83e0-fb3f5609afc8" /></td>
  </tr>
</table>

## 🛠️ 技術スタック

<img  src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img  src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img  src="https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"> <img  src="https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white"> <img  src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white">

## 🔗 リンク

- [デモサイト](https://formgen-xi.vercel.app/)
- [npm パッケージ](https://www.npmjs.com/package/@formgen-he2e2/core)
- [GitHub Repository](https://github.com/he2e2/formgen)
- [問題を報告](https://github.com/he2e2/formgen/issues)

## 🤝 貢献

貢献を歓迎します！詳細については貢献ガイドをお読みください。
