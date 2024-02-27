import { FormEvent } from "react";
import styles from "./AskWindow.module.css"
import axios from 'axios';

const AskWindow: React.FC<AskWindowProps> = ({ setChatId, clientId }) => {
  const handleClick = () => {
    axios.get(`http://localhost:8000/create_chat/${clientId}`)
    .then(response => {
      console.log('chatId:', response.data.chat_id);
      setChatId(response.data.chat_id)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const enteredChatId = formData.get('chatId');

    if (!enteredChatId) {
      return;
    }

    const chatId = Number(enteredChatId);

    axios.get(`http://localhost:8000/connect_to_chat/${clientId}/${chatId}`)
    .then(response => {
      setChatId(chatId)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  return (
  <div className={styles.window}>
      <div className={styles.content}>
            <h1>Action</h1>
            <form onSubmit={handleSubmit}>
              <input type="number" name="chatId" placeholder="Enter chat ID" />
              <button className={styles.askBtn} type="submit">Connect</button>
            </form>
            <button onClick={handleClick} className={styles.askBtn}>Create new</button>
      </div>
  </div>
  )
}

export default AskWindow;