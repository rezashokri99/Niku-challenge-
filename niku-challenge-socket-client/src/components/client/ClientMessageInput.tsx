import React, { useState } from 'react';
import EmojiIcon from "@/icons/emojiIcon";
import PaperClipIcon from "@/icons/paperClipIcon";
import SendIcon from "@/icons/sendIcon";
import MicrophoneIcon from "@/icons/microphone";

interface ClientMessageInputProps {
    onSendMessage: (text: string) => void;
}

const ClientMessageInput: React.FC<ClientMessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    // ارسال پیام و پاک کردن فیلد ورودی
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-auto bg-white flex items-center py-4 px-3 gap-x-2">
            <div className="border border-gray-300 w-full h-[42px] flex items-center justify-between rounded-xl px-2 py-3 shadow-input">
                <div className="flex-1 flex items-center gap-x-2 w-full">
                    <MicrophoneIcon />
                    <div className="w-full">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="پیام خود را بنویسید..."
                            className="w-full outline-none text-sm"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center gap-x-1">
                    <EmojiIcon />
                    <PaperClipIcon />
                </div>
            </div>
            <button
                type="submit"
                className="bg-green-600 p-2.5 rounded-full disabled:bg-gray-300"
                disabled={!message}
            >
                <SendIcon />
            </button>
        </form>
    );
};

export default ClientMessageInput;