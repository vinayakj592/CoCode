import './App.css';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react';
import { FiMenu } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:5000');

function CodeEditor() {
  const { roomId } = useParams();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleEditorChange = (value) => {
    setCode(value);
    socket.emit('codeChange', { roomId, code: value });
  };

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    socket.on('loadCode', (loadedCode) => {
      setCode(loadedCode);
    });

    socket.on('codeChange', (updatedCode) => {
      setCode(updatedCode);
    });

    return () => {
      socket.off('loadCode');
      socket.off('codeChange');
    };
  }, [roomId]);

  return (
    <div className="h-screen relative flex flex-col overflow-hidden">
      <header className="bg-gradient-to-r from-black via-gray-900 to-black shadow-md p-4 text-white flex justify-between items-center h-14 border-b border-gray-800 z-20">
        <button
          className="block lg:hidden text-white text-3xl ml-4"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu />
        </button>
        <h1 className="text-xl font-bold mx-auto">CoCode</h1>
        <div className="hidden lg:flex space-x-4 mr-4">
          <select
            className="bg-gray-800 text-white border border-gray-600 rounded-lg p-1 text-sm"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
          <select
            className="bg-gray-800 text-white border border-gray-600 rounded-lg p-1 text-sm"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
            <option value="hc-black">High Contrast Black</option>
          </select>
        </div>
      </header>

      <nav
        className={`fixed top-0 right-0 h-full bg-gray-900 bg-opacity-90 backdrop-blur-lg p-6 transition-transform transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden z-20`}
      >
        <ul className="space-y-6 text-lg">
          <li>
            <button
              className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2"
              onClick={() => setMenuOpen(false)}
            >
              Close Menu
            </button>
          </li>
          <li>
            <select
              className="bg-gray-800 text-white border border-gray-600 rounded-lg p-2 w-full"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>
          </li>
          <li>
            <select
              className="bg-gray-800 text-white border border-gray-600 rounded-lg p-2 w-full"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="vs-dark">Dark</option>
              <option value="light">Light</option>
              <option value="hc-black">High Contrast Black</option>
            </select>
          </li>
        </ul>
      </nav>

      <div className="flex-grow relative z-10 bg-gray-900 p-1.5 border-8 border-t-0 border-transparent bg-gradient-to-r from-black via-gray-900 to-black">
        <Editor
          height="100%"
          language={language}
          value={code || ''}
          onChange={handleEditorChange}
          theme={theme}
          options={{
            minimap: { enabled: false },
            lineHeight: 24,
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;