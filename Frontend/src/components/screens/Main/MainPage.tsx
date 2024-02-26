import styles from './MainPage.module.css'
import ChatWindow from './ChatWindow/ChatWindow'
import AskWindow from './AskWindow/AskWindow'
import { useState } from 'react';
import './MainPage.scss'

function MainPage() {
  const [chooseAction, setChooseAction] = useState(false);

    return (
        <main className={styles.main}>
          <div className={styles.content}>
          {chooseAction ? <ChatWindow /> : <AskWindow setChooseAction={setChooseAction}/>}
          </div>
        </main>
  )
}

export default MainPage
