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

                <button onClick={sendMessage}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                  </svg>
                </button>
            </footer>
      </div>
    </div>
  )
}

export default ChatWindow;