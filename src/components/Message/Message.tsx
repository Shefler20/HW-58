import * as React from "react";
import './Message.css';

interface Props {
    message: IMessage;
}

const Message: React.FC<Props> = ({message}) => {
    return (
        <div className="message">
            <h3>{message.author}</h3>
            <p>{message.message}</p>
            <p>{message.datetime}</p>
        </div>
    );
};

export default Message;