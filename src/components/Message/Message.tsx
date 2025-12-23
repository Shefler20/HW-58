import * as React from "react";
import './Message.css';
import dayjs from 'dayjs'


interface Props {
    message: IMessage;
}

const Message: React.FC<Props> = ({message}) => {
    return (
        <div className="message">
            <h3>{message.author}</h3>
            <p>{message.message}</p>
            <p>{dayjs(message.datetime).format('DD.MM.YYYY (dddd) - HH:mm')}</p>
        </div>
    );
};

export default Message;