import styles from './MainPage.module.css'
import ChatWindow from './ChatWindow/ChatWindow'
import AskWindow from './AskWindow/AskWindow'
import { useEffect, useState } from 'react';
import './MainPage.scss'

function MainPage() {
  const clientId = Date.now();
  const [ws] = useState(new WebSocket(`ws://localhost:8000/ws/${clientId}`));
  const [chatId, setChatId] = useState<number | null>(null);

  useEffect(() => {
    console.log('SET CHATID: ', chatId)
  }, [chatId])

    return (
        <main className={styles.main}>
          <div className={styles.content}>
            {chatId ? <ChatWindow ws={ws} clientId={clientId} /> : <AskWindow setChatId={setChatId} clientId={clientId}/>}
          </div>
        </main>
  )
}

export default MainPage
