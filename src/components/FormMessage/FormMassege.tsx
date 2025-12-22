import {useState} from "react";
import * as React from "react";
import {toast} from "react-toastify";

interface Props {
    addMessage: (message: IMessage) => void;
}

const FormMessage: React.FC<Props> = ({addMessage}) => {
    const [form, setForm] = useState<MessageMutation>({
        name: '',
        message: ''
    });

    const onChangeInputAndTextArea = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.name.trim().length === 0 || form.message.trim().length === 0) {
            toast.error("Please fill all fields");
        } else {
            addMessage({
                ...form,
                id: String(new Date().toISOString()),
            });
            setForm({
                name: '',
                message: ''
            });
            toast.success("Message added!");
        }
    };


    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Введите имя"
                        value={form.name}
                        onChange={onChangeInputAndTextArea}
                    />
                </div>
                <div>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={onChangeInputAndTextArea}
                        placeholder="Сообщение" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormMessage;