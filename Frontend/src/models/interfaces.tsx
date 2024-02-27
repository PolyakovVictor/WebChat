interface Message {
    text: string;
}

interface AskWindowProps {
    clientId: number;
    setChatId: (newValue: number) => void;
  }

interface ChatWindowProps {
    ws: WebSocket;
    clientId: number;
    chatId: number;
}