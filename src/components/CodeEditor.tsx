import React from 'react';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);


export const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
  return (
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <CodeIcon className="h-5 w-5 text-gray-400" />
        <label htmlFor="code-editor" className="text-lg font-semibold text-gray-200">
          HTML Editor
        </label>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        You can directly edit the generated HTML here. The preview will update in real-time.
      </p>
      <textarea
        id="code-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-grow w-full p-4 bg-gray-900 border border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-200 font-mono text-sm"
        spellCheck="false"
        aria-label="HTML Code Editor"
      />
    </div>
  );
};
