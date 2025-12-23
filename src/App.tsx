import FormMessage from "./components/FormMessage/FormMassege.tsx";
import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import './App.css';
import Message from "./components/Message/Message.tsx";


const App = () => {
    const [message, setMessage] = useState<IMessage[]>([]);

    const addMessage = (message: IMessage) => {
        setMessage(prevMessage => [message, ...prevMessage]);
    };

    const URL = 'http://146.185.154.90:8000/messages';


    useEffect(() => {
        let lastDateLocal = '';

        const fetchMessages = async () => {
            const url = lastDateLocal
                ? `${URL}?datetime=${lastDateLocal}`
                : URL;

            const res = await fetch(url);
            const data: IMessage[] = await res.json();

            if (data.length === 0) return;

            setMessage(prev =>
                lastDateLocal ? [...prev, ...data] : data
            );

            lastDateLocal = data[data.length - 1].datetime;
        };

        fetchMessages().catch(console.error);

        const interval = setInterval(fetchMessages, 5000);

        return () => clearInterval(interval);
    }, [])

  return (
      <>
          <ToastContainer />
          <FormMessage addMessage={addMessage}/>
          <hr/>
          {message.map((message) => (
              <Message
                  key={message._id}
                  message={message}
              />
          ))}
      </>
  )
};

export default App
