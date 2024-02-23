import styles from './MainPage.module.css'
import ChatWindow from './ChatWindow/ChatWindow'
import './MainPage.scss'

function MainPage() {
    return (
        <main className={styles.main}>
          <div className={styles.content}>
            <ChatWindow />
          </div>
        </main>
  )
}

export default MainPage
