interface Message {
    text: string;
}

interface AskWindowProps {
    setChooseAction: (newValue: boolean) => void;
  }