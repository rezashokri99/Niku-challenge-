import React, {useState} from 'react';
import BookmarkIcon from "@/icons/bookmarkIcon.tsx";
import SendIcon from "@/icons/sendIcon.tsx";

interface AgentMessageInputProps {
    onSendMessage: (text: string) => void;
    disabled: boolean;
}

const AgentMessageInput: React.FC<AgentMessageInputProps> = ({onSendMessage, disabled}) => {
    const [message, setMessage] = useState('');

    // ارسال پیام و پاک کردن فیلد ورودی
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (message.trim() && !disabled) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <>
            <div className={"mt-auto flex items-center py-4 px-3 gap-x-2"}>
                <form onSubmit={handleSubmit}
                    className={"bg-white h-[62px] border border-gray-300 w-full flex items-center justify-between rounded-xl shadow-input"}>
                    <div className={"flex items-center w-full"}>
                        <div className={"px-3 border-l py-3"}>
                            <BookmarkIcon/>
                        </div>
                        <div className={"w-full px-3"}>
                            <input
                                className={"text-xs w-11/12 outline-none"}
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={disabled ? "ابتدا یک کاربر را انتخاب کنید" : "پیام خود را بنویسید..."}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    <button
                        disabled={!message || disabled}
                        type="submit"
                        className={"mx-6 bg-green-600 text-white flex items-center justify-center rounded-3xl gap-x-2 py-2 px-2 disabled:bg-gray-300"}>
                        <span className={"text-nowrap"}>ارسال پیام</span>
                        <SendIcon/>
                    </button>
                </form>
            </div>
        </>
    );
};

export default AgentMessageInput;