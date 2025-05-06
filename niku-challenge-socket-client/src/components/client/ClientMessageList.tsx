import React, { useEffect, useRef } from 'react';
import { Message } from '@/interfaces';
import formatTime from "@/utils/formatTime.ts";

interface ClientMessageListProps {
    messages: Message[];
}

const ClientMessageList: React.FC<ClientMessageListProps> = ({ messages }) => {
    // رفرنس برای اسکرول به آخرین پیام
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // اسکرول به پایین لیست پیام‌ها پس از اضافه شدن پیام جدید
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);




    return (
        <div className="flex-1 bg-white px-3 py-2 overflow-y-auto flex flex-col gap-y-6 min-h-[480px] max-h-[480px]">
            {messages.map((message) => (
                <React.Fragment key={message.id}>
                    {message.isFromAgent ? (
                        <div className="flex items-center justify-start gap-x-2">
                            <div className="bg-green-400 border-2 border-white rounded-full w-[30px] h-[30px] flex items-center justify-center">
                                <span className="h-3.5 text-xs font-medium text-purple-950">JD</span>
                            </div>
                            <div className="bg-white max-w-[184px] border border-gray-300 rounded-xl rounded-br-none shadow-input">
                                <div className="p-2 text-xs leading-5 break-all whitespace-pre-wrap overflow-wrap-anywhere overflow-hidden">
                                    {message.text}
                                </div>
                            </div>
                            <div>
                                <span className="text-[8px]">{formatTime(message.timestamp)}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center flex-row-reverse justify-start gap-x-2">
                            <div className="bg-green-600 max-w-[184px] text-white border border-gray-300 rounded-xl rounded-bl-none shadow-input">
                                <div className="p-2 text-xs leading-5 break-all whitespace-pre-wrap overflow-wrap-anywhere overflow-hidden">
                                    {message.text}
                                </div>
                            </div>
                            <div>
                                <span className="text-[8px]">{formatTime(message.timestamp)}</span>
                            </div>
                        </div>
                    )}
                </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ClientMessageList;