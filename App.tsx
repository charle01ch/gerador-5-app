
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { PreviewWindow } from './components/PreviewWindow';
import { CodeEditor } from './components/CodeEditor';
import { CssEditor } from './components/CssEditor';
import { generateAppCode } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedHtml, setGeneratedHtml] = useState<string>('');
  const [cssCode, setCssCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'prompt' | 'code' | 'css'>('prompt');

  // Load from localStorage on initial component mount
  useEffect(() => {
    try {
      const savedHtml = localStorage.getItem('appgen-html-code');
      if (savedHtml) {
        setGeneratedHtml(savedHtml);
      }
      const savedCss = localStorage.getItem('appgen-css-code');
      if (savedCss) {
        setCssCode(savedCss);
      }
    } catch (e) {
      console.error("Failed to read from localStorage", e);
    }
  }, []);

  // Auto-save HTML to localStorage with a debounce
  useEffect(() => {
    if (generatedHtml) { // Only save if there's content
      const handler = setTimeout(() => {
        try {
          localStorage.setItem('appgen-html-code', generatedHtml);
        } catch (e) {
          console.error("Failed to save HTML to localStorage", e);
        }
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [generatedHtml]);

  // Auto-save CSS to localStorage with a debounce
  useEffect(() => {
    if (cssCode) { // Only save if there's content
      const handler = setTimeout(() => {
        try {
          localStorage.setItem('appgen-css-code', cssCode);
        } catch (e) {
          console.error("Failed to save CSS to localStorage", e);
        }
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [cssCode]);


  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your app.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedHtml('');
    setCssCode('');
    setActiveTab('prompt');

    try {
      const htmlContent = await generateAppCode(prompt);
      setGeneratedHtml(htmlContent);
      setActiveTab('code');
    } catch (err) {
      console.error(err);
      setError('Failed to generate app. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <Header />
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden">
        <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex-shrink-0 border-b border-gray-700">
            <nav className="flex space-x-2 p-2" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('prompt')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'prompt'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
                aria-current={activeTab === 'prompt' ? 'page' : undefined}
              >
                Prompt
              </button>
              <button
                onClick={() => setActiveTab('code')}
                disabled={!generatedHtml}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'code'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-current={activeTab === 'code' ? 'page' : undefined}
              >
                HTML Editor
              </button>
              <button
                onClick={() => setActiveTab('css')}
                disabled={!generatedHtml}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'css'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-current={activeTab === 'css' ? 'page' : undefined}
              >
                CSS Editor
              </button>
            </nav>
          </div>

          <div className="flex-grow overflow-y-auto">
            {activeTab === 'prompt' && (
              <PromptInput
                prompt={prompt}
                setPrompt={setPrompt}
                onGenerate={handleGenerate}
                isLoading={isLoading}
                error={error}
              />
            )}
            {activeTab === 'code' && (
              <CodeEditor
                code={generatedHtml}
                setCode={setGeneratedHtml}
              />
            )}
            {activeTab === 'css' && (
              <CssEditor
                code={cssCode}
                setCode={setCssCode}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <PreviewWindow htmlContent={generatedHtml} cssContent={cssCode} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default App;
