import React, { useState, useRef, useEffect } from 'react';
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
  const [showIO, setShowIO] = useState(false);
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
    setShowIO(true); // Always show output when running code
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
    <div className="w-full p-4 flex flex-col bg-[#1e1e1e] rounded-lg border border-[#474747] overflow-hidden">
      {/* Compiler Header */}
      <div className="flex justify-between items-center p-2 bg-[#252526] border-b border-[#474747]">
        <div className="flex items-center space-x-2">
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-xs bg-[#3e3e42] text-white rounded px-2 py-1 border border-[#007acc]"
            disabled={isRunning}
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </Select>
        </div>
        
        <Button
          onClick={handleRunCode}
          disabled={isRunning}
          className={`text-xs px-3 py-1 rounded bg-[#007acc] hover:bg-[#0e639c] text-white ${
            isRunning ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isRunning ? 'Running...' : 'Run'}
        </Button>
      </div>

      {/* Code Editor */}
      <div className="h-64">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: 'on',
            glyphMargin: false,
          }}
        />
      </div>

      {/* Input/Output Section - Only shown when needed */}
      {showIO && (
        <div className="bg-[#252526] border-t border-[#474747]">
          {/* Input */}
          {input && (
            <div className="p-2 border-b border-[#474747]">
              <div className="text-xs text-gray-400 mb-1">Input</div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-[#1e1e1e] text-white text-xs p-2 font-mono rounded border border-[#474747]"
                rows={3}
                placeholder="Enter input..."
                disabled={isRunning}
              />
            </div>
          )}
          
          {/* Output */}
          <div className="p-2">
            <div className="text-xs text-gray-400 mb-1">Output</div>
            <pre className="bg-[#1e1e1e] text-green-400 text-xs p-2 rounded font-mono whitespace-pre-wrap overflow-auto max-h-40">
              {output || 'Output will appear here...'}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompilerPage;