import {useState} from "react";
import * as React from "react";
import {toast} from "react-toastify";

const FormMessage = () => {
    const [form, setForm] = useState<MessageMutation>({
        author: '',
        message: ''
    });

    const onChangeInputAndTextArea = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const url = 'http://146.185.154.90:8000/messages';
            const data = new URLSearchParams();

            data.set('author', form.author);
            data.set('message', form.message);

            const response = await fetch(url, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) throw new Error('Failed to send message');

            setForm({ author: '', message: '' });
            toast.success("Message sent!");
        } catch (err) {
            toast.error("Error sending message");
            console.error(err);
        }
    };


    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text"
                        name="author"
                        placeholder="Введите имя"
                        value={form.author}
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