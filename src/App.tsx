import FormMessage from "./components/FormMessage/FormMassege.tsx";
import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import './App.css';
import Message from "./components/Message/Message.tsx";

const URL = 'http://146.185.154.90:8000/messages';

const App = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [lastMessage, setLastMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchAll = async () => {
            const res = await fetch(URL);
            const data: IMessage[] = await res.json();

            const reversed = [...data].reverse();

            setMessages(reversed);

            if (reversed.length > 0) {
                setLastMessage(reversed[0].datetime);
            }
        };

        fetchAll().catch(console.error);
    }, []);

    useEffect(() => {
        if (!lastMessage) return;

        const intervalId = setInterval(async () => {
            const res = await fetch(`${URL}?datetime=${lastMessage}`);
            const newData: IMessage[] = await res.json();

            if (newData.length === 0) return;

            setMessages(prev => [...newData, ...prev]);
            setLastMessage(newData[newData.length - 1].datetime);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [lastMessage]);

    return (
      <>
          <ToastContainer />
          <FormMessage/>
          <hr/>
          {messages.map((message) => (
              <Message
                  key={message._id}
                  message={message}
              />
          ))}
      </>
  )
};

export default App
