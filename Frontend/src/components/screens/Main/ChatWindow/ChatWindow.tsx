import styles from "./ChatWindow.module.css"
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";

const ChatWindow = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on('receive_message', (msg: any) => {
      setMessages(prev => [...prev, msg ])
    });

    const randomMessages: Message[] = [];
    for (let i = 0; i < 10; i++) {
      randomMessages.push({ nickname: 'nick', text: `Random Message ${i}` });
    }
    setMessages(randomMessages);
  }, []);

  const sendMessage = () => {
    socket.emit('send_message', { text: messageText } as any);
    setMessageText('');
  }

  return (
    <div className={styles.chatWindow}>
        <div className={styles.content}>
            <h1>chat</h1>

            <div className={styles.messages}>
                {messages.map(msg => <div className={styles.msg}>{msg.nickname}|{msg.text}</div>)}
            </div>

            <div className={styles.messages}>
                <div className={styles.msg}>some text for msg|Hero</div>
            </div>

            <footer>
                <textarea value={messageText} placeholder="Enter message" onChange={(e) => setMessageText(e.target.value)}></textarea>

                <button onClick={sendMessage}>SEND</button>
            </footer>
      </div>
    </div>
  )
}

export default ChatWindow;