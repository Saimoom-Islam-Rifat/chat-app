import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { searchUsers } from "../services/user.js";
import {
  createConversation,
  getMessages,
  sendMessage,
} from "../services/message.js";

export default function Messenger() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    async function getCurrentUser() {
      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    }

    getCurrentUser();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  async function handleSearch(e) {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const users = await searchUsers(searchQuery);
      setSearchResults(users);
    } catch (error) {
      console.error("Search failed:", error.message);
    }
  }

  async function handleSelectUser(user) {
    try {
      const conversation = await createConversation(user._id);
      const messages = await getMessages(conversation._id);
      console.log("Conversation:", conversation);

      setSelectedUser(user);
      setMessages(messages);
    } catch (error) {
      console.error("Failed to create conversation:", error.message);
    }
  }

  async function handleSendMessage() {
    if (!messageText.trim()) {
      return;
    }

    try {
      const conversation = await createConversation(selectedUser._id);

      const message = await sendMessage(conversation._id, messageText);

      setMessages((previousMessages) => [...previousMessages, message]);

      setMessageText("");
    } catch (error) {
      console.error("Failed to send message:", error.message);
    }
  }

  return (
    <div>
      <header>
        <h1>Messenger</h1>

        {user && (
          <div>
            <span>{user.name}</span>

            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>

      <main>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search users"
            value={searchQuery}
            onChange={handleSearchQuery}
          />
          <button type="submit">Search</button>
        </form>
        <div>
          {searchResults.map((user) => (
            <div key={user._id} onClick={() => handleSelectUser(user)}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
        <aside>
          <h2>Chats</h2>

          <p>No conversations yet.</p>
        </aside>

        <section>
          {selectedUser ? (
            <div>
              <h2>{selectedUser.name}</h2>
              <div>
                {messages.map((message) => {
                  const isMyMessage = message.sender === user.id;

                  return (
                    <div key={message._id}>
                      <p>{isMyMessage ? "You" : selectedUser.name}</p>
                      <p>{message.text}</p>
                    </div>
                  );
                })}
              </div>

              <input
                type="text"
                placeholder="Enter your message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          ) : (
            <p>Select a conversation to start chatting.</p>
          )}
        </section>
      </main>
    </div>
  );
}
