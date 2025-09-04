import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { z } from 'zod';

import { FormGenerator, type FormSchema } from '@formgen-he2e2/core';
import '@formgen-he2e2/core/styles.css';

import './index.css';
import { Button, IconCard } from './components';
import { ExamplesPage } from './pages/examples/ExamplesPage';
import { GuidePage } from './pages/guide/GuidePage';

const schema: FormSchema = {
  groups: [],
  ungroupedFields: [
    { type: 'text', name: 'username', label: '이름', required: true },
    { type: 'checkbox', name: 'agree', label: '약관 동의', required: true },
  ],
};

const customSchema = z.object({
  username: z.string().min(3, '사용자 이름은 최소 3자 이상 입력하셔야 합니다.'),
});

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="FormGen" className="h-8 w-24" />
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              홈
            </Link>
            <Link
              to="/guide"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/guide'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              가이드
            </Link>
            <Link
              to="/examples"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/examples'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              예제
            </Link>
            <Button
              className="btn-outline min-w-1/5 hover:bg-custom-gray"
              onClick={() => {
                window.open('https://github.com/he2e2/formgen', '_blank');
              }}
            >
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

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
            window.open(
              'https://www.npmjs.com/package/@formgen-he2e2/core',
              '_blank'
            );
          }}
        >
          @formgen-he2e2/core
        </Button>
      </div>
    </header>
  );
};

const Introduction = () => {
  return (
    <section className="text-center py-24 px-16 w-full bg-white text-text-black rounded-t-3xl flex flex-col items-center gap-12">
      <h2 className="text-2xl font-medium">
        가이드 페이지에서 자세한 설명을 확인할 수 있습니다.
      </h2>
      <div className="grid grid-auto-fit gap-6 w-full">
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
    <div className="mockup-code w-full">
      <pre data-prefix="1">
        <code>{`import { FormGenerator, type FormSchema } from '@formgen-he2e2/core';`}</code>
      </pre>
      <pre data-prefix="2">
        <code>{`import '@formgen-he2e2/core/styles.css';`}</code>
      </pre>
      <pre data-prefix="3">
        <code>{`import { z } from 'zod';`}</code>
      </pre>
      <pre data-prefix="4">
        <code></code>
      </pre>
      <pre data-prefix="5">
        <code>{`const schema: FormSchema = {`}</code>
      </pre>
      <pre data-prefix="6">
        <code>{`  groups: [],`}</code>
      </pre>
      <pre data-prefix="7">
        <code>{`  ungroupedFields: [`}</code>
      </pre>
      <pre data-prefix="8">
        <code>{`    { type: 'text', name: 'username', label: '이름', required: true },`}</code>
      </pre>
      <pre data-prefix="9">
        <code>{`    { type: 'checkbox', name: 'agree', label: '약관 동의', required: true },`}</code>
      </pre>
      <pre data-prefix="10">
        <code>{`  ],`}</code>
      </pre>
      <pre data-prefix="11">
        <code>{`};`}</code>
      </pre>
      <pre data-prefix="12">
        <code></code>
      </pre>
      <pre data-prefix="13">
        <code>{`const customSchema = z.object({`}</code>
      </pre>
      <pre data-prefix="14">
        <code>{`  username: z.string().min(3, '사용자 이름은 최소 3자 이상 입력하셔야 합니다.'),`}</code>
      </pre>
      <pre data-prefix="15">
        <code>{`  agree: z.boolean().refine((val) => val, '약관에 동의해야 합니다.'),`}</code>
      </pre>
      <pre data-prefix="16">
        <code>{`});`}</code>
      </pre>
      <pre data-prefix="17">
        <code></code>
      </pre>
      <pre data-prefix="18">
        <code>{`export default function App() {`}</code>
      </pre>
      <pre data-prefix="19">
        <code>{`  return (`}</code>
      </pre>
      <pre data-prefix="20">
        <code>{`    <FormGenerator`}</code>
      </pre>
      <pre data-prefix="21">
        <code>{`      schema={schema}`}</code>
      </pre>
      <pre data-prefix="22">
        <code>{`      customSchema={customSchema}`}</code>
      </pre>
      <pre data-prefix="23">
        <code>{`      onSubmit={(data) => {`}</code>
      </pre>
      <pre data-prefix="24">
        <code>{`        console.log('폼 제출 결과:', data);`}</code>
      </pre>
      <pre data-prefix="25">
        <code>{`      }}`}</code>
      </pre>
      <pre data-prefix="26">
        <code>{`    />`}</code>
      </pre>
      <pre data-prefix="27">
        <code>{`  );`}</code>
      </pre>
      <pre data-prefix="28">
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
        폼을 작성하고 제출 버튼을 눌러보세요. 아래에는 코드 미리보기가 있습니다.
      </p>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full bg-white p-6 rounded-lg shadow-md">
          <FormGenerator
            schema={schema}
            customSchema={customSchema}
            onSubmit={(data) => {
              console.log('폼 제출 결과:', data);
            }}
          />
        </div>
        <div className="w-full">
          <CodePreview />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="text-center p-4 text-text-black">
      <p>© 2025 FormGen. All Rights Reserved.</p>
    </footer>
  );
};

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-full min-h-screen text-text-black font-family-pretendard">
      <Header />
      <Introduction />
      <DemoForm />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/examples" element={<ExamplesPage />} />
          <Route path="/guide" element={<GuidePage />} />
        </Routes>
      </div>
    </Router>
  );
}
