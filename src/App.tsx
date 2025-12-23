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

    console.log(message)

    useEffect(() => {
        const fetchMessage = async () => {
            const response = await fetch(URL);
            const userMessage: IMessage[] =await response.json();

            setMessage(userMessage);
        };
        fetchMessage().catch(console.error);
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
