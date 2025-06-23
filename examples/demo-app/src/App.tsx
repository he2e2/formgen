import { FormGenerator, type FormSchema } from '@formgen/core';
import '@formgen/core/core.css';
import './index.css';
import { z } from 'zod';
import { Button, IconCard } from './components';

const schema: FormSchema = [
  { type: 'text', name: 'username', label: '이름', required: true },
  { type: 'checkbox', name: 'agree', label: '약관 동의', required: true },
];

const customSchema = z.object({
  username: z.string().min(3, '사용자 이름은 최소 3자 이상 입력하셔야 합니다.'),
});

const Header = () => {
  return (
    <header className="text-text-black p-20 text-center gap-3 flex flex-col items-center font-pretendard">
      <h1 className="text-5xl font-bold hidden">FormGen</h1>
      <img src="/logo.png" alt="FormGen Logo" className="h-32 mb-4" />
      <p className="text-lg ">간편한 폼 생성 라이브러리</p>
      <div className="flex flex-col gap-3 mt-4">
        <Button
          className="btn-outline min-w-1/5 hover:bg-custom-gray"
          onClick={() => {
            window.open('https://github.com/he2e2/formgen', '_blank');
          }}
        >
          Github에서 보기
        </Button>
      </div>
    </header>
  );
};

const Introduction = () => {
  return (
    <section className="text-center py-24 px-16 w-full bg-white text-text-black rounded-t-3xl">
      <h2 className="hidden">소개</h2>
      <div className="grid grid-auto-fit gap-6">
        <IconCard
          icon="/Thunder.png"
          title="빠른 개발"
          description="스키마 정의만으로 완성되는 즉시 사용 가능한 폼 생성"
        />
        <IconCard
          icon="/Shield.png"
          title="유효성 검사"
          description="Zod 기반 타입 안전성과 실시간 검증으로 견고한 데이터 처리"
        />
        <IconCard
          icon="/Palette.png"
          title="커스터마이징"
          description="요소별 독립적인 클래스 적용으로 자유로운 디자인 구현"
        />
      </div>
    </section>
  );
};

const CodePreview = () => {
  return (
    <div className="mockup-code w-1/2">
      <pre data-prefix="1">
        <code>{`import { FormGenerator, type FormSchema } from '@formgen/core';`}</code>
      </pre>
      <pre data-prefix="2">
        <code>{`import '@formgen/core/core.css';`}</code>
      </pre>
      <pre data-prefix="3">
        <code>{`import { z } from 'zod';`}</code>
      </pre>
      <pre data-prefix="4">
        <code></code>
      </pre>
      <pre data-prefix="5">
        <code>{`const schema: FormSchema = [`}</code>
      </pre>
      <pre data-prefix="6">
        <code>{`  { type: 'text', name: 'username', label: '이름', required: true },`}</code>
      </pre>
      <pre data-prefix="7">
        <code>{`  { type: 'checkbox', name: 'agree', label: '약관 동의', required: true },`}</code>
      </pre>
      <pre data-prefix="8">
        <code>{`});`}</code>
      </pre>
      <pre data-prefix="9">
        <code></code>
      </pre>
      <pre data-prefix="10">
        <code>{`const customSchema = z.object({`}</code>
      </pre>
      <pre data-prefix="11">
        <code>{`  username: z.string().min(3, '사용자 이름은 최소 3자 이상 입력하셔야 합니다.'),`}</code>
      </pre>
      <pre data-prefix="12">
        <code>{`});`}</code>
      </pre>
      <pre data-prefix="13">
        <code></code>
      </pre>
      <pre data-prefix="14">
        <code>{`export default function App() {`}</code>
      </pre>
      <pre data-prefix="15">
        <code>{`  return (`}</code>
      </pre>
      <pre data-prefix="16">
        <code>{`    <FormGenerator`}</code>
      </pre>
      <pre data-prefix="17">
        <code>{`      schema={schema}`}</code>
      </pre>
      <pre data-prefix="18">
        <code>{`      customSchema={customSchema}`}</code>
      </pre>
      <pre data-prefix="19">
        <code>{`      onSubmit={(data) => {`}</code>
      </pre>
      <pre data-prefix="20">
        <code>{`        console.log('폼 제출 결과:', data);`}</code>
      </pre>
      <pre data-prefix="21">
        <code>{`      }}`}</code>
      </pre>
      <pre data-prefix="22">
        <code>{`    />`}</code>
      </pre>
      <pre data-prefix="23">
        <code>{`  );`}</code>
      </pre>
      <pre data-prefix="24">
        <code>{`}`}</code>
      </pre>
    </div>
  );
};

const DemoForm = () => {
  return (
    <section className="py-16 px-12 bg-custom-gray text-text-black flex flex-col items-center gap-16 w-full">
      <h2 className="hidden">데모 폼</h2>
      <p className="text-2xl font-medium">
        왼쪽 폼에 입력하고 제출 버튼을 눌러보세요. 오른쪽에는 코드 미리보기가
        있습니다.
      </p>
      <div className="w-full flex gap-3 flex-row">
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
          <FormGenerator
            schema={schema}
            customSchema={customSchema}
            onSubmit={(data) => {
              console.log('폼 제출 결과:', data);
            }}
          />
        </div>
        <CodePreview />
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="text-center p-4 text-text-black">
      <p>© 2025 FormGen. All rights reserved.</p>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-full min-h-screen text-text-black font-family-pretendard">
      <Header />
      <Introduction />
      <DemoForm />
      <Footer />
    </div>
  );
}
