# [PairCode](paircode.in) - Real-Time Collaborative Code Editor

## 📖 About PairCode

PairCode is a real-time collaborative code editor that enables multiple users to work together on the same codebase simultaneously. The platform is built using the MERN stack (MongoDB, Express, React, and Node.js) and uses Socket.IO to synchronize code changes across different users.

Key features include:
- Real-time code sharing and editing.
- Support for multiple programming languages (JavaScript, Python, C++, etc.).
- Dark and light theme options.
- Minimalistic and responsive UI with a side navigation menu.

## 🛠️ Tech Stack

- **Frontend**: React, Monaco Editor, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO
- **Deployment**: Render for backend, Vercel for frontend

## 🎯 Features

- **Real-Time Collaboration**: Multiple users can edit code in real time.
- **Language Support**: Select from various programming languages (JavaScript, Python, C++, Java, HTML, CSS).
- **Themes**: Choose between dark, light, or high contrast themes.
- **Room-Based Sessions**: Each session is associated with a unique room ID for collaborative coding.
- **Responsive Design**: Works seamlessly across mobile, tablet, and desktop.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/CoCode.git
    ```

2. Navigate to the project directory:
    ```bash
    cd CoCode
    ```

3. Install the dependencies for both frontend and backend:
    ```bash
    cd cocode-backend
    npm install
    cd ../cocode-frontend
    npm install
    ```

4. Create a `.env` file in the `cocode-backend` directory with the following content:
    ```bash
    MONGODB_URI=mongodb://localhost:27017/cocode
    PORT=5000
    ```

5. Start MongoDB:
    ```bash
    mongod
    ```

6. Start the backend server:
    ```bash
    cd cocode-backend
    node server.js
    ```

7. Start the frontend server:
    ```bash
    cd cocode-frontend
    npm run dev
    ```

8. Open your browser and go to:
    ```
    http://localhost:5173
    ```

## 💻 Usage

- **Creating a Room**: Visit the homepage, and you will be assigned a unique room ID. Share this ID with others to start collaborating.
- **Collaborative Editing**: Any code changes made in the editor will be reflected in real time for all users in the same room.
- **Switching Language/Theme**: Use the dropdown menus in the top navigation bar to change the programming language or editor theme.

## 📂 Project Structure

```bash
PairCode/
│
├── paircode-frontend/       # Frontend React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.jsx
│   │   │   ├── CodeEditor.jsx
│   │   │   └── ...other components
│   ├── public/
│   └── ...
│
├── paircode-backend/        # Backend Node.js Application
│   ├── routes/
│   │   └── codeRoutes.js
│   ├── sockets/
│   │   └── codeSocket.js
│   ├── models/
│   │   └── CodeSession.js
│   └── server.js
│
└── README.md              # Project Documentation
