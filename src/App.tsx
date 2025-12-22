import FormMessage from "./components/FormMessage/FormMassege.tsx";
import {ToastContainer} from "react-toastify";
import {useState} from "react";


const App = () => {
    const [message, setMessage] = useState<IMessage[]>([]);

    const addMessage = (message: IMessage) => {
        setMessage(prevMessage => [message, ...prevMessage]);
    };

    console.log(message)
  return (
    <>
        <ToastContainer />
        <FormMessage addMessage={addMessage}/>
    </>
  )
};

export default App
