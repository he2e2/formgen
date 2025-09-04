import React from 'react';
import { CodeBlock } from '../../../components';

export const InstallationContent: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-4">설치하기</h1>
    <p className="text-lg text-gray-600 mb-6">
      FormGen을 프로젝트에 설치하고 설정하는 방법을 안내합니다.
    </p>

    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          패키지 설치
        </h2>
        <p className="text-gray-600 mb-4">
          npm 또는 yarn을 사용해 설치할 수 있습니다:
        </p>

        <CodeBlock
          title="npm으로 설치"
          code="npm install @formgen-he2e2/core zod"
        />

        <CodeBlock
          title="yarn으로 설치"
          code="yarn add @formgen-he2e2/core zod"
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          스타일 시트 임포트
        </h2>
        <p className="text-gray-600 mb-4">
          CSS 스타일을 적용하기 위해 스타일 시트를 임포트하세요:
        </p>

        <CodeBlock
          title="스타일 시트 임포트"
          code={`import '@formgen-he2e2/core/styles.css';

// 또는 커스텀 스타일 적용
import './custom-form-styles.css';`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">기본 설정</h2>
        <p className="text-gray-600 mb-4">React 애플리케이션에서 기본 설정:</p>

        <CodeBlock
          title="App.tsx"
          code={`import React from 'react';
import { FormGenerator, type FormSchema } from '@formgen-he2e2/core';
import '@formgen-he2e2/core/styles.css';

function App() {
  return (
    <div className="App">
      <h1>My Form App</h1>
      {/* FormGenerator 컴포넌트 사용 */}
    </div>
  );
}

export default App;`}
        />
      </div>
    </div>
  </div>
);
