import { FormGenerator, type FormSchema } from "@formgen/core";
import { z } from "zod";

const schema: FormSchema = [
  { type: "text", name: "username", label: "이름", required: true },
  { type: "checkbox", name: "agree", label: "약관 동의", required: true },
];

const customSchema = z.object({
  username: z.string().min(3, "사용자 이름은 최소 3자 이상"),
});

export default function App() {
  return (
    <div>
      <h1>FormGen 데모</h1>
      <FormGenerator
        schema={schema}
        customSchema={customSchema}
        onSubmit={(data) => {
          console.log("폼 제출 결과:", data);
        }}
      />
    </div>
  );
}
