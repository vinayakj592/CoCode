import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:roomId" element={<CodeEditor />} />
      </Routes>
    </Router>
  );
}

export default App;