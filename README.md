# React-App-LLM Project Documentation

- Team members
- 23bds011 (B varshith)
- 23bds024 (J Ganesh)
- 23bds015 (B Harsha)
- 23bds033 (M Jagadeeswar)
- 23bds053 (Izhaar ahmed)

- A full-stack application for a Large Language Model (LLM) with medical query capabilities.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [WebSocket Events](#websocket-events)
- [Database Schema](#database-schema)
- [Key Components](#key-components)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Error Handling](#error-handling)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Features

### Backend
- RESTful API endpoints
- WebSocket integration for real-time updates
- MongoDB integration for data persistence
- JWT authentication
- Medical API integration
- Chat history management
- Real-time chat updates

### Frontend
- Real-time chat interface with LLM
- Medical query detection and specialized responses
- Chat history management
- WebSocket integration for real-time updates
- Responsive design
- Authentication integration
- Medical reference handling

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- WebSocket
- JWT
- PubMed API integration

### Frontend
- React.js
- Vite
- WebSocket
- Tailwind CSS
- React Icons

## Project Structure

### Backend

backend/
├── controllers/
│   ├── chatController.js
│   ├── medicalController.js
│   └── authController.js
├── models/
│   ├── chatModel.js
│   └── userModel.js
├── routes/
│   ├── chatRoute.js
│   ├── medicalRoute.js
│   └── authRoute.js
├── middleware/
│   ├── authToken.js
│   
├── services/
│   └── emailService.js
├── app.js
└── server.js


### Frontend

frontend/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── VerificationPending.jsx
│   │   │   └── VerifyEmail.jsx
│   │   ├── footer/
│   │   │   └── Footer.jsx
│   │   ├── header/
│   │   │   └── Header.jsx
│   │   ├── home/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── VerifyEmail.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── SidebarContext.jsx
│   ├── utils/
│   │   └── medicalDetector.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
└── package.json


## Setup Instructions

### Backend

1. Install dependencies:
bash
npm install


2. Create a .env file in the root directory with:
env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000


3. Start the development server:
bash
npm run dev


### Frontend

1. Install dependencies:
bash
npm install


2. Create a .env file in the root directory with:
env
VITE_API_KEY=your_gemini_api_key


3. Start the development server:
bash
npm run dev


## API Endpoints

### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- POST /api/auth/refresh - Refresh token

### Chat
- GET /api/history - Get chat history
- POST /api/save - Save chat message
- DELETE /api/delete - Delete chat session

### Medical
- POST /api/medical - Process medical queries
- Returns medical information with references
- Falls back to Gemini API when needed

## WebSocket Events

### Chat Updates
- CHAT_UPDATE - Real-time chat updates
- CHAT_DELETE - Chat deletion notifications
- CHAT_NEW - New chat notifications

## Database Schema

### Chat Model
javascript
{
  sessionId: String,
  userId: ObjectId,
  messages: [{
    prompt: String,
    response: String,
    timestamp: Date,
    isMedical: Boolean,
    references: Array
  }],
  title: String,
  isMedical: Boolean,
  createdAt: Date,
  updatedAt: Date
}


### User Model
javascript
{
  username: String,
  email: String,
  password: String,
  createdAt: Date
}


## Key Components

### App.jsx
- Main application component
- Handles chat state management
- Manages WebSocket connections
- Processes medical queries
- Handles chat history

### Sidebar.jsx
- Displays chat history
- Manages chat sessions
- Handles chat deletion
- Groups chats by date

### Chat.jsx
- Renders chat interface
- Handles message input
- Displays chat messages
- Manages message formatting

### Message.jsx
- Renders individual messages
- Handles medical references
- Formats message content
- Manages message styling

## API Integration

### Medical API
- Detects medical queries
- Provides specialized medical responses
- Handles medical references
- Falls back to Gemini API when needed

### Gemini API
- Handles general queries
- Provides LLM responses
- Manages conversation context
- Handles error cases

## State Management
- Uses React hooks for state management
- Maintains chat history
- Manages active sessions
- Handles real-time updates

## Error Handling
- Custom error middleware (backend)
- HTTP status codes
- Error logging
- Client-friendly error messages
- Graceful fallback to Gemini API (frontend)
- User-friendly error messages
- WebSocket reconnection
- Session management

## Security
- JWT authentication
- Password hashing
- CORS configuration
- Rate limiting
- Input validation

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License
