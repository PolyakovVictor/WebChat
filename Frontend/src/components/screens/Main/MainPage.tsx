import styles from './MainPage.module.css'
import ChatWindow from './ChatWindow/ChatWindow'
import AskWindow from './AskWindow/AskWindow'
import { useState } from 'react';
import './MainPage.scss'

function MainPage() {
  const client_id = Date.now();
  const [ws] = useState(new WebSocket('ws://localhost:8000/ws'));
  const [chooseAction, setChooseAction] = useState(false);

    return (
        <main className={styles.main}>
          <div className={styles.content}>
            {chooseAction ? <ChatWindow ws={ws}/> : <AskWindow client_id={client_id} setChooseAction={setChooseAction}/>}
          </div>
        </main>
  )
}

export default MainPage
