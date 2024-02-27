import styles from "./AskWindow.module.css"
import axios from 'axios';

const AskWindow: React.FC<AskWindowProps> = ({ setChooseAction, client_id }) => {
  const handleClick = () => {
    axios.get(`http://localhost:8000/create_chat/${client_id}`)
    .then(response => {
      console.log('Data:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  return (
  <div className={styles.window}>
      <div className={styles.content}>
            <h1>Action</h1>
            <button className={styles.askBtn}>Connect</button>
            <button onClick={handleClick} className={styles.askBtn}>Create new</button>
      </div>
  </div>
  )
}

export default AskWindow;