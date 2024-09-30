import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const generateRandomRoom = () => {
    const randomId = Math.random().toString(36).substring(2, 10);
    navigate(`/${randomId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white font-sans">
      {/* Top Section */}
      <header className="flex justify-center py-6">
        <h1 className="text-4xl font-bold">PairCode</h1>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl font-extrabold mb-4">Share Code in Real-time with Developers</h2>
        <p className="text-lg mb-8">An online code editor for interviews, troubleshooting, teaching & more...</p>
        <button
          className="px-8 py-4 bg-pink-500 text-lg font-semibold rounded-md hover:bg-pink-600 transition duration-300"
          onClick={generateRandomRoom}
        >
          Share Code Now
        </button>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Code with your team</h3>
              <p className="mb-4">Open a PairCode editor, write or copy code, and share it with colleagues. Pair program and troubleshoot together.</p>
              <button
                className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition"
                onClick={generateRandomRoom}
              >
                Hack Together
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Interview developers</h3>
              <p className="mb-4">Set coding tasks and observe in real-time during remote or in-person interviews.</p>
              <button
                className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition"
                onClick={generateRandomRoom}
              >
                Start An Interview
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Teach people to program</h3>
              <p className="mb-4">Share your code with students and peers to educate them. Used by universities globally.</p>
              <button
                className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition"
                onClick={generateRandomRoom}
              >
                Teach Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="py-4 bg-gray-900 text-center">
        <p className="text-sm">
          Created by <a href="https://github.com/vinayakj592" className="underline">Vinayak Joshi</a>
        </p>
      </footer> */}
    </div>
  );
}

export default Home;
