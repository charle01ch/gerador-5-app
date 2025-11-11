import React, { useState } from 'react';

type DeviceType = 'mobile' | 'desktop';

interface PreviewWindowProps {
  htmlContent: string;
  cssContent: string;
  isLoading: boolean;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
        <p className="mt-4 text-lg font-medium">Generating your masterpiece...</p>
        <p className="text-sm text-gray-500">The AI is warming up its circuits.</p>
    </div>
);

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082a.75.75 0 01.75.75v5.714a2.25 2.25 0 00.659 1.591L19.8 18.44a2.25 2.25 0 010 3.182l-2.25 2.25a2.25 2.25 0 01-3.182 0l-4.242-4.242a2.25 2.25 0 00-1.591-.659H5.644a2.25 2.25 0 01-1.591-.659L1.409 15.38a2.25 2.25 0 010-3.182l2.25-2.25a2.25 2.25 0 011.591-.659h5.714z" />
        </svg>
        <h3 className="text-xl font-bold text-gray-400">Your App Preview Appears Here</h3>
        <p className="mt-2 text-sm">Enter a prompt and click "Generate App" to see the magic happen. The generated UI will be displayed live in this window.</p>
    </div>
);

export const PreviewWindow: React.FC<PreviewWindowProps> = ({ htmlContent, cssContent, isLoading }) => {
  const [device, setDevice] = useState<DeviceType>('mobile');

  const getSrcDoc = () => {
    if (!htmlContent) return '';
    if (!cssContent.trim()) return htmlContent;

    const styleTag = `<style>${cssContent}</style>`;
    
    // Inject the style tag before the closing </head> tag for proper application.
    const headEndIndex = htmlContent.lastIndexOf('</head>');
    if (headEndIndex !== -1) {
      return `${htmlContent.slice(0, headEndIndex)}${styleTag}${htmlContent.slice(headEndIndex)}`;
    }
    
    // Fallback if no </head> is found (should be rare)
    return htmlContent;
  };

  const handleDownload = () => {
    const contentToDownload = getSrcDoc();
    if (!contentToDownload) return;

    const blob = new Blob([contentToDownload], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-app.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deviceClasses = {
    mobile: 'w-[375px] h-[667px] max-w-full max-h-full',
    desktop: 'w-full h-full',
  };

  return (
    <div className="p-4 flex flex-col h-full items-center justify-center">
      <div className="flex-shrink-0 w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 rounded-lg bg-gray-900 p-1">
          <button 
            onClick={() => setDevice('mobile')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${device === 'mobile' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
          >
            Mobile
          </button>
          <button 
            onClick={() => setDevice('desktop')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${device === 'desktop' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
          >
            Desktop
          </button>
        </div>
        <button
            onClick={handleDownload}
            disabled={!htmlContent || isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
            Download App
        </button>
      </div>

      <div className={`bg-gray-900 p-2 rounded-xl shadow-2xl transition-all duration-300 ease-in-out ${deviceClasses[device]}`}>
        <div className="w-full h-full bg-white rounded-lg overflow-hidden">
          {isLoading ? (
            <LoadingIndicator />
          ) : htmlContent ? (
            <iframe
              srcDoc={getSrcDoc()}
              title="Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <Placeholder />
          )}
        </div>
      </div>
    </div>
  );
};
