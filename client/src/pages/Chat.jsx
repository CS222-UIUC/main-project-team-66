// import React, { useState, useEffect } from 'react';
// import { useWebSocket } from './websocket_client';

// const Chat = ({ userID }) => {
//   const [toUser, setToUser] = useState('');
//   const [messageContent, setMessageContent] = useState('');
//   const [messages, setMessages] = useState([]);
//   const socket = useWebSocket();

//   useEffect(() => {
//     if (socket) {
//       socket.onmessage = (event) => {
//         const message = JSON.parse(event.data);
//         if (message.error) {
//           console.error("Error:", message.error);
//         } else {
//           setMessages((prev) => [...prev, message]);
//         }
//       };
//     }
//   }, [socket]);

//   const sendMessage = () => {
//     if (socket && toUser && messageContent) {
//       const message = { from: userID, to: toUser, content: messageContent };
//       socket.send(JSON.stringify(message));
//       setMessageContent('');
//     }
//   };

//   return (
//     <div>
//       <div>
//         <label>To User ID:</label>
//         <input
//           type="text"
//           value={toUser}
//           onChange={(e) => setToUser(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Message:</label>
//         <input
//           type="text"
//           value={messageContent}
//           onChange={(e) => setMessageContent(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <div id="chatBox" style={{ border: '1px solid black', height: '300px', overflowY: 'scroll' }}>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.from}</strong>: {msg.content} <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useState, useEffect } from 'react';

const Chat = ({ userID }) => {
  const [socket, setSocket] = useState(null);
  const [toUser, setToUser] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket(`ws://localhost:8080?userID=${userID}`);
    setSocket(ws);

    ws.onopen = () => console.log("Connected to WebSocket server");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.error) {
        console.error("Error:", message.error);
      } else {
        setMessages((prev) => [...prev, message]);
      }
    };

    ws.onclose = () => console.log("Disconnected from WebSocket server");

    // Cleanup on component unmount
    return () => ws.close();
  }, [userID]);

  const sendMessage = () => {
    if (socket && toUser && messageContent) {
      const message = { from: userID, to: toUser, content: messageContent };
      socket.send(JSON.stringify(message));
      setMessageContent('');
    }
  };

  return (
    <div>
      <div>
        <label>To User ID:</label>
        <input
          type="text"
          value={toUser}
          onChange={(e) => setToUser(e.target.value)}
        />
      </div>
      <div>
        <label>Message:</label>
        <input
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div id="chatBox" style={{ border: '1px solid black', height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.from}</strong>: {msg.content} <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
