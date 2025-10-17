import React, { useState, useRef } from 'react';
import Editor from "@monaco-editor/react";
import { Button, Select } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const CompilerPage = () => {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(
    `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World!" << endl;\n    return 0;\n}`
  );
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef(null);

  const languages = [
    { value: 'cpp', label: 'C++' },
    { value: 'py', label: 'Python' },
  ];

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleRunCode = async () => {
    if (!editorRef.current) return;

    setIsRunning(true);
    setOutput('$ Running your code...');
    const startTime = performance.now();

    try {
      const response = await axios.post(
        'http://localhost:4000/api/compute/execute',
        {
          language,
          code: editorRef.current.getValue(),
          input
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          timeout: 10000
        }
      );

      if (response.data.success) {
        setOutput(`$ ${response.data.result.output}\n\n$ Program finished successfully`);
      } else {
        setOutput(`$ ${response.data.result.error || 'Error executing code'}`);
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        setOutput('$ Error: Request timeout (10s)');
      } else if (error.response) {
        setOutput(`$ Error: ${error.response.data.error || 'Unknown error'}`);
      } else {
        setOutput(`$ Error: ${error.message}`);
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#1e1e1e] rounded-lg border border-cyan-500 overflow-hidden">
      {/* Compiler Header */}
      <div className="flex justify-between items-center p-3 bg-black border-b border-cyan-500">
        <div className="flex items-center space-x-4">
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-sm bg-gray-900 text-cyan-400 rounded px-3 py-1 border border-cyan-500 font-mono"
            disabled={isRunning}
          >
            {languages.map((lang) => (
              <option
                key={lang.value}
                value={lang.value}
                className="bg-gray-900 text-cyan-400"
              >
                {lang.label}
              </option>
            ))}
          </Select>
        </div>

        <Button
          onClick={handleRunCode}
          disabled={isRunning}
          className={`px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-sm ${isRunning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {isRunning ? (
            <>
              <span className="animate-pulse">EXECUTING</span>
              <span className="blinking-cursor ml-1">_</span>
            </>
          ) : (
            'RUN CODE'
          )}
        </Button>
      </div>

      {/* Code Editor */}
      <div className="h-96 border-b border-cyan-500">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: 'on',
            glyphMargin: false,
            renderLineHighlight: 'gutter',
          }}
        />
      </div>

      {/* Input Section - Always visible */}
      <div className="bg-gray-900 p-3 border-b border-cyan-500">
        <div className="text-cyan-400 text-sm font-mono mb-2">> INPUT</div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-black text-green-400 text-sm p-3 font-mono rounded border border-cyan-500 focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300"
          rows={4}
          placeholder="Enter program input here..."
          disabled={isRunning}
          spellCheck="false"
        />
      </div>

      {/* Output Section - Always visible */}
      <div className="bg-gray-900 p-3 flex-grow">
        <div className="text-cyan-400 text-sm font-mono mb-2">> OUTPUT</div>
        <pre className="bg-black text-green-400 text-sm p-3 font-mono rounded border border-cyan-500 whitespace-pre-wrap overflow-auto h-32">
          {output || '$ Ready for execution...'}
        </pre>
      </div>

      {/* Blinking cursor animation */}
      <style jsx>{`
        .blinking-cursor {
          animation: blink 1s step-end infinite;
          color: #4ade80;
        }
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CompilerPage;