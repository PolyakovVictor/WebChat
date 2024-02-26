import styles from "./AskWindow.module.css"
import { useState, useEffect } from 'react';


const AskWindow: React.FC<AskWindowProps> = ({ setChooseAction }) => {

  return (
  <div className={styles.window}>
      <div className={styles.content}>
            <h1>AskWindow</h1>
            <button className={styles.askBtn}>Connect to chat</button>
            <button className={styles.askBtn}>Create new chat</button>
      </div>
  </div>
  )
}

export default AskWindow;