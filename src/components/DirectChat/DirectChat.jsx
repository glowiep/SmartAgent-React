import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ActionCable from "actioncable";
import { useAppContext } from "../../context/AppContext";

// Date formatting
import ReactTimeAgo from "react-time-ago";

/**
 * DirectChat component represents a chat interface for direct messaging between agents.
 *
 * @param {Object} agent - The agent object.
 * @param {number} currentAgentId - The ID of the current agent.
 * @returns {JSX.Element} - The DirectChat component.
 */
const DirectChat = ({ agent, currentAgentId }) => {
  const [text, setText] = useState("");
  const [apiMessages, setApiMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { state, dispatch } = useAppContext();
  console.log(apiMessages);
  /**
   * Scrolls to the bottom of the message list.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [apiMessages]);

  useEffect(() => {
    console.log("Current agent ID:", currentAgentId);
    const endpoint = `api/v1/direct_chats?sender_id=${currentAgentId}&receiver_id=${agent.id}`;

    // Fetch initial messages from the server
    axios
      .get(endpoint)
      .then((response) => {
        setApiMessages(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    // Create a WebSocket connection
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

    // Subscribe to the DirectChatChannel
    const subscription = cable.subscriptions.create("DirectChatChannel", {
      received: (response) => {
        console.log("Received a message:", response);
        if (response.receiver_id === Number(currentAgentId)) {
          setApiMessages((prevMessages) => [...prevMessages, response]);
        }
      },
    });

    return () => {
      // Disconnect from the WebSocket when the component unmounts
      cable.subscriptions.remove(subscription);
    };
  }, [currentAgentId, agent.id]);

  /**
   * Handles the input change event.
   * @param {Object} event - The input change event.
   */
  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  /**
   * Handles sending a message.
   */
  const handleSendMessage = () => {
    if (text.trim() !== "") {
      // Send the message to the server
      axios
        .post("api/v1/direct_chats", {
          sender_id: currentAgentId,
          receiver_id: agent.id,
          message: text,
        })
        .then((response) => {
          console.log(response.data); // This will log the created message to the console
          setApiMessages((prevMessages) => [...prevMessages, response.data]);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

      setText("");
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto border border-double bg-gray-100 dark:bg-gray-300 rounded-lg w-[800px]">
      {/* Agent header */}
      <div
        key={agent.id}
        className="bg-white shadow-lg rounded-lg flex items-center w-full dark:bg-gray-700"
      >
        <div className="flex justify-center items-center h-8 w-8 bg-gray-300 text-gray-700 rounded-full mx-3">
          <span className=" text-sm">{agent.full_name.charAt(0)}</span>
        </div>
        <div className="p-4 flex-grow text-center dark:bg-gray-700 dark:text-white">
          <h2 className="font-bold text-lg">{agent.full_name}</h2>
        </div>
      </div>

      {/* Message list */}
      <div className="overflow-y-auto max-h-screen">
        {apiMessages.map((message, index) => {
          if (!message) return null;
          return (
            <div
              key={index}
              className={`flex p-4 flex-col ${
                message.receiver_id === Number(currentAgentId)
                  ? "items-start"
                  : "items-end"
              }`}
            >
              {/* Message bubble */}
              <div
                className={`px-4 py-2 rounded-lg shadow-sm ${
                  message.receiver_id === Number(currentAgentId)
                    ? "bg-gray-200 text-gray-700"
                    : "bg-blue-500 text-white"
                }`}
              >
                {message.message}
              </div>
              <ReactTimeAgo
                className=" text-gray-400 dark:text-gray-600"
                date={Date.parse(message.created_at)}
                locale="en-US"
              />
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input field */}
      <div className="flex mt-auto p-3 w-full">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow rounded-lg border border-gray-300 px-4 dark:text-white py-2 focus:outline-none focus:border-blue-500"
          value={text}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSendMessage();
              event.preventDefault();
            }
          }}
        />
        <button
          className="ml-3 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DirectChat;

DirectChat.propTypes = {
  agent: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  currentAgentId: PropTypes.string.isRequired,
};
