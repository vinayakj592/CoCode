import './App.css';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react';
import { FiMenu } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const socket = io('https://cocode-backend.onrender.com', {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-[#252525] text-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-black to-[#252525] shadow-xl border-b border-black">
        <button
          className="lg:hidden text-2xl text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu />
        </button>
        <h1 className="text-lg lg:text-xl font-extrabold tracking-wide">PairCode</h1>
        <div className="hidden lg:flex space-x-4">
          <select
            className="bg-black text-white border border-black rounded-lg p-2 shadow-lg hover:bg-[#242424] transition duration-200"
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
            className="bg-black text-white border border-black rounded-lg p-2 shadow-lg hover:bg-[#242424] transition duration-200"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
            <option value="hc-black">High Contrast Black</option>
          </select>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="fixed inset-0 bg-black bg-opacity-95 p-4 lg:hidden z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button
              className="text-3xl text-white"
              onClick={() => setMenuOpen(false)}
            >
              &times; {/* Smaller 'X' symbol */}
            </button>
          </div>
          <ul className="space-y-4 text-lg">
            <li>
              <select
                className="bg-black text-white border border-black rounded-lg p-2 w-full shadow-md"
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
                className="bg-black text-white border border-black rounded-lg p-2 w-full shadow-md"
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
      )}

      {/* Code Editor */}
      <div className="flex-grow relative shadow-xl">
        <Editor
          height="calc(100vh - 60px)"
          language={language}
          value={code || ''}
          onChange={handleEditorChange}
          theme={theme}
          options={{
            minimap: { enabled: false },
            lineHeight: 22,
            fontSize: 16,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;