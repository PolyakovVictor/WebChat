interface Message {
    text: string;
}

interface AskWindowProps {
    client_id: number;
    setChooseAction: (newValue: boolean) => void;
  }

interface ChatWindowProps {
    ws: WebSocket;
}