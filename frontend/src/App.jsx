import React, { useState, useEffect, useRef, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SidebarContext } from "./context/SidebarContext";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthContext } from "./context/AuthContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatSessions, setChatSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  const { user } = useContext(AuthContext);
  const maxMessagesPerSession = 20;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!user) return;

    async function fetchChatHistory() {
      try {
        const response = await fetch("http://localhost:5000/api/history", {
          credentials: "include",
        });
        const data = await response.json();
        const history = data.map((chat) => [
          { text: chat.prompt, isUser: true, timestamp: chat.timestamp },
          { text: chat.response, isUser: false, timestamp: chat.timestamp },
        ]);
        setMessages(history.flat());
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    }

    fetchChatHistory();
  }, [user]);

  const handleNewChat = () => {
    if (messages.length > 0) {
      const existingSessionIndex = chatSessions.findIndex(
        (session) => JSON.stringify(session) === JSON.stringify(messages)
      );

      if (existingSessionIndex === -1) {
        const updatedSessions = [...chatSessions, messages];
        setChatSessions(updatedSessions);
        localStorage.setItem("chatSessions", JSON.stringify(updatedSessions));
      }
    }
    setMessages([]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (!prompt.trim()) return;

    if (messages.length >= maxMessagesPerSession) {
      alert("Chat limit reached. Please start a new chat.");
      return;
    }

    const newMessages = [
      ...messages,
      { text: prompt, isUser: true, timestamp: new Date() },
    ];
    setMessages(newMessages);
    setPrompt("");
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_API_KEY;
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        const botReply = data.candidates[0].content.parts[0].text;
        setMessages([
          ...newMessages,
          { text: botReply, isUser: false, timestamp: new Date() },
        ]);

        await fetch("http://localhost:5000/api/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, response: botReply }),
          credentials: "include", // Include cookies in the request
        });
      } else {
        console.error("Unexpected API response:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            user ? (
              <div className="flex flex-col h-screen bg-gray-900 text-white">
                <Sidebar
                  onNewChat={handleNewChat}
                  chatSessions={chatSessions}
                  setChatSessions={setChatSessions}
                  setMessages={setMessages}
                />

                <div className="flex-1 flex flex-col">
                  <header className="text-center text-xl font-bold py-4 bg-gray-800 shadow-md">
                    <button
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="absolute left-4"
                    >
                      ☰
                    </button>
                    Chat App
                  </header>
                  <div className="flex-1 flex items-center justify-center max-h-177">
                    <div className="w-full max-w-full h-5/6 overflow-y-auto bg-gray-800 rounded-lg p-6 shadow-md custom-scrollbar">
                      {messages.map((message, i) => (
                        <div
                          key={i}
                          className={`p-3 my-2 rounded-3xl max-w-xl ${
                            message.isUser
                              ? "bg-blue-500 text-white self-end ml-auto"
                              : "bg-gray-700 text-gray-200 self-start"
                          }`}
                        >
                          <div>{message.text}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="p-3 my-2 rounded-3xl max-w-xl bg-gray-700 text-gray-200 self-start">
                          Typing...
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="p-3 flex gap-3 bg-gray-800 shadow-lg"
                  >
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Type here..."
                      className="flex-1 p-2 bg-gray-700 text-white rounded-md outline-none text-sm"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition font-bold text-sm"
                      disabled={isLoading}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <Home />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
