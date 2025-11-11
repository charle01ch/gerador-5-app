import React from 'react';

interface CssEditorProps {
  code: string;
  setCode: (code: string) => void;
}

const CssIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M20.2 16.2c.4-.9.6-1.9.6-3.2 0-3.3-2.7-6-6-6-.4 0-.9 0-1.3.1" />
    <path d="M11.3 12.8c-.3 1.1-.9 2.1-1.8 2.9-.9.8-2.1 1.3-3.5 1.3-3.3 0-6-2.7-6-6s2.7-6 6-6c1.4 0 2.6.5 3.5 1.3.9.8 1.5 1.8 1.8 2.9" />
    <path d="M18 7.8c.3-.3.8-.3 1.1 0l1.1 1.1c.3.3.3.8 0 1.1l-6.2 6.2c-.3.3-.8.3-1.1 0l-1.1-1.1c-.3-.3-.3-.8 0-1.1l6.2-6.2z" />
    <path d="m14 12 1.5 1.5" />
  </svg>
);


export const CssEditor: React.FC<CssEditorProps> = ({ code, setCode }) => {
  return (
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <CssIcon className="h-5 w-5 text-gray-400" />
        <label htmlFor="css-editor" className="text-lg font-semibold text-gray-200">
          Custom CSS
        </label>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        Add your own CSS rules here. The styles will be applied to the preview window in real-time.
      </p>
      <textarea
        id="css-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={`/* Example */\nbody {\n  background-color: #f0f8ff;\n}`}
        className="flex-grow w-full p-4 bg-gray-900 border border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-200 font-mono text-sm"
        spellCheck="false"
        aria-label="Custom CSS Editor"
      />
    </div>
  );
};
