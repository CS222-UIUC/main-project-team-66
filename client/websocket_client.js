// // // 

// // const userID = 'user1'; // unique user ID
// // const socket = new WebSocket(`ws://localhost:8080?userID=${userID}`);

// // socket.onopen = () => {
// //   console.log("Connected to the WebSocket server");
// // };

// // socket.onmessage = (event) => {
// //   const message = JSON.parse(event.data);

// //   if (message.error) {
// //     console.error("Error:", message.error);
// //   } else {
// //     displayMessage(message);
// //   }
// // };

// // socket.onclose = () => {
// //   console.log("Disconnected from WebSocket server"); // we can also add reconnection logic if needed
// // };

// // function sendMessage(to, content) {
// //   const message = { from: userID, to, content };
// //   socket.send(JSON.stringify(message));
// // }

// // function displayMessage(message) {
// //   const chatBox = document.getElementById('chatBox');
// //   const messageElement = document.createElement('div');
// //   messageElement.innerText = `[${message.from}] ${message.content} (${new Date(message.timestamp).toLocaleTimeString()})`;
// //   chatBox.appendChild(messageElement);
// // }

// // // Sending a message
// // document.getElementById('sendButton').onclick = () => {
// //   const toUser = document.getElementById('toUser').value;
// //   const messageContent = document.getElementById('messageContent').value;
// //   sendMessage(toUser, messageContent);
// // };

// import React, { createContext, useContext, useEffect, useState } from 'react';

// const WebSocketContext = createContext();

// export const WebSocketProvider = ({ userID, children }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const ws = new WebSocket(`ws://localhost:8080?userID=${userID}`);

//     ws.onopen = () => console.log("Connected to WebSocket server");
//     ws.onclose = () => console.log("Disconnected from WebSocket server");
//     setSocket(ws);

//     return () => ws.close();
//   }, [userID]);

//   return (
//     <WebSocketContext.Provider value={socket}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };

// export const useWebSocket = () => useContext(WebSocketContext);