import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CodeEditor from './CodeEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Welcome to CoCode</div>} />
        <Route path="/:roomId" element={<CodeEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
