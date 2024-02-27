import styles from "./ChatWindow.module.css"
import { useState, useEffect } from 'react';


const ChatWindow: React.FC<ChatWindowProps> = ({ ws, clientId, chatId }) => {
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  
  const sendMessage = () => {
    ws.send(messageText);
  }

  useEffect(() => {
    ws.onopen = () => ws.send('Connect to React')
    ws.onmessage = (e) => {
      console.log(e.data)
      setMessages(prev => [...prev, e.data ])
    }
    ws.onclose = (event) => {
      if (event.wasClean) {
        alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
      } else {
        alert('[close] Соединение прервано');
      }
    };
  
  }, []);

  return (
  <div className={styles.chatWindow}>
      <div className={styles.content}>
          <h1>Chat id ={">"} {chatId}</h1>

          <div className={styles.messages}>
            {messages.map((msg, index) => (
                <div key={index} className={styles.msg}>{msg}</div>
            ))}
          </div>

          <footer>
              <textarea value={messageText} placeholder="Enter message" onChange={(e) => setMessageText(e.target.value)}></textarea>

              <button className={styles.sendBtn} onClick={sendMessage}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                      <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                  </svg>
              </button>
          </footer>
      </div>
  </div>
  )
}

export default ChatWindow;