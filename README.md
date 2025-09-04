<div align=center>
<img width="962" alt="Image" src="https://github.com/user-attachments/assets/4f4b9dc8-4657-49e3-a085-679a76b2e484" />
</div>

<div align="center">

> Schema-based React form generator - Complete forms with simple JSON configuration

**🚀 [Live Demo](https://formgen-xi.vercel.app/)** | **📦 [npm Package](https://www.npmjs.com/package/@formgen-he2e2/core)**

## 🌐 Languages

[한국어](./README.ko.md) | [日本語](./README.ja.md)

</div>

## ✨ Features

- 🎯 **Schema-based**: Complete forms with just JSON configuration
- 🛡️ **Type Safety**: Zod validation with TypeScript support
- ⚡ **Fast Development**: Eliminate repetitive form writing
- 🎨 **Customizable**: Independent styling
- 🌍 **i18n Support**: Multi-language form validation (NEW!)

## 🚀 Quick Start

### Installation

```bash
npm install @formgen-he2e2/core
# or
pnpm add @formgen-he2e2/core
# or
yarn add @formgen-he2e2/core
```

### Basic Usage

```typescript
import { FormGenerator, type FormSchema } from "@formgen-he2e2/core";
import "@formgen-he2e2/core/styles.css";
import { z } from "zod";

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
    console.log("Form data:", data);
  };

  return (
    <FormGenerator
      schema={schema}
      onSubmit={handleSubmit}
      language="en" // Set language manually
    />
  );
}
```

## 🌍 Multi-language Support (NEW!)

FormGen now supports 3 languages with automatic browser detection:

```typescript
// Automatic browser language detection
<FormGenerator schema={schema} onSubmit={handleSubmit} />

// Manual language setting
<FormGenerator
  schema={schema}
  onSubmit={handleSubmit}
  language="en" // en | ko | ja
/>
```

Supported Languages:

- 🇺🇸 English (en)
- 🇰🇷 한국어 (ko)
- 🇯🇵 日本語 (ja)

## 📚 Supported Field Types

| 타입     | 설명               | 예시                |
| -------- | ------------------ | ------------------- |
| text     | Basic text input   | Name, title, etc.   |
| email    | Email input        | user@example.com    |
| password | Password input     | •••••••••           |
| number   | Number input       | Age, price, etc.    |
| textarea | Long text input    | Description, etc.   |
| select   | Dropdown selection | Choose from options |
| radio    | Radio button       | Single selection    |
| checkbox | Checkbox           | Multiple selection  |
| date     | Date picker        | 2025-01-01          |

> See [Live Demo](https://formgen-xi.vercel.app/) for detailed interfaces.

## 🎨 Advanced Usage

### Custom Styling

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

### Complex Validation

```typescript
const validationSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Must include uppercase, lowercase, number, and special character"
    ),
});
```

## 🎮 Examples

### Registration Form

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

## 🛠️ Tech Stack

<img  src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img  src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img  src="https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"> <img  src="https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white"> <img  src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white">

## 🔗 Links

- [Live Demo](https://formgen-xi.vercel.app/)
- [npm Package](https://www.npmjs.com/package/@formgen-he2e2/core)
- [GitHub Repository](https://github.com/he2e2/formgen)
- [Report Issues](https://github.com/he2e2/formgen/issues)

## 🤝 Contributing

Contributions are welcome!
