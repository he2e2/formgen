import React from 'react';

interface CodeBlockProps {
  title: string;
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ title, code }) => (
  <div className="bg-gray-900 rounded-lg p-4 mt-4">
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-sm font-medium text-gray-300">{title}</h4>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded bg-gray-800 hover:bg-gray-700"
      >
        복사
      </button>
    </div>
    <pre className="text-sm text-gray-300 overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);
