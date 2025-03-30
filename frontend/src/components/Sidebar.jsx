import React, { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";

const Sidebar = ({
  onNewChat,
  chatSessions,
  handleLoadChat,
  handleDeleteChat,
  loadingStates,
  activeSessionId,
  isNewChat,
}) => {
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);

  // Function to truncate text for display
  const truncateText = (text, length = 20) => {
    return text?.length > length ? text.substring(0, length) + "..." : text;
  };

  const getSessionTitle = (session) => {
    return (
      session.title ||
      session.messages?.find((m) => m.isUser)?.text?.slice(0, 30) ||
      "New Chat"
    );
  };

  return (
    <div
      className={`w-[260px] bg-gray-800 min-h-screen h-full flex flex-col transform transition-transform duration-300 fixed ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } z-10`}
    >
      <div className="header p-3 flex justify-between items-center border-b border-gray-700">
        <button
          onClick={() => setSidebarOpen(false)}
          className="close-button p-2 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors"
          disabled={loadingStates.deleting}
          aria-label="Close sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button
          onClick={onNewChat}
          className="new-chat-button p-2 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors"
          disabled={loadingStates.deleting}
          aria-label="Start new chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      <div className="chat-history flex-1 overflow-y-auto p-3">
        {Object.entries(chatSessions).map(
          ([category, sessions]) =>
            sessions.length > 0 && (
              <div key={category} className="mb-4">
                <h3 className="text-xs font-semibold mb-2 text-gray-400 uppercase tracking-wider">
                  {category}
                </h3>
                <ul>
                  {sessions.map((session, index) => (
                    <li
                      key={session.id}
                      className={`chat-item p-2 hover:bg-gray-700 rounded-lg flex justify-between items-center text-gray-300 hover:text-white mb-1 transition-colors ${
                        activeSessionId === session.id && !isNewChat
                          ? "bg-gray-700"
                          : ""
                      }`}
                    >
                      <button
                        onClick={() => handleLoadChat(session)}
                        className="flex-1 text-left truncate"
                        disabled={
                          loadingStates.deleting || loadingStates.loadingChat
                        }
                        title={getSessionTitle(session)}
                      >
                        {getSessionTitle(session)}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChat(index, category);
                        }}
                        className="delete-button p-1 hover:bg-gray-600 rounded text-red-400 hover:text-red-300 ml-2 transition-colors"
                        disabled={loadingStates.deleting}
                        aria-label="Delete chat"
                      >
                        {loadingStates.deleting ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
        )}
      </div>
      <div className="p-3 border-t border-gray-700">
        <button
          className="w-full p-2 flex items-center justify-center gap-2 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors"
          disabled={loadingStates.deleting}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>Upgrade Plan</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
