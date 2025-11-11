
import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const examplePrompts = [
    "A landing page for a new SaaS product called 'SynthWave' that helps developers.",
    "A simple portfolio website for a photographer named Jane Doe, with a gallery and contact form.",
    "A to-do list application with a clean interface, input field, and task list.",
    "A sales page for an ebook about 'The Art of Cooking', with testimonials and a buy now button.",
];


export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  onGenerate,
  isLoading,
  error,
}) => {
  return (
    <div className="p-6 flex flex-col h-full">
      <label htmlFor="prompt" className="text-lg font-semibold text-gray-200 mb-2">
        Describe your app or sales page
      </label>
      <p className="text-sm text-gray-400 mb-4">
        Be as descriptive as possible. Mention the purpose, key features, and desired style.
      </p>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., A simple delivery app with a home screen, product list, cart, and payment button."
        className="flex-grow w-full p-4 bg-gray-900 border border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-200"
        rows={10}
      />
      <div className="mt-4">
        <p className="text-xs text-gray-500 mb-2">Need ideas? Try one of these:</p>
        <div className="flex flex-wrap gap-2">
            {examplePrompts.map((p, i) => (
                <button 
                    key={i} 
                    onClick={() => setPrompt(p)}
                    className="px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors"
                >
                    {p.substring(0, 30)}...
                </button>
            ))}
        </div>
      </div>
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full mt-6 py-3 px-6 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors duration-200"
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            Generating...
          </>
        ) : (
          'Generate App'
        )}
      </button>
    </div>
  );
};
