import React, {useEffect, useRef} from 'react';
import {Message} from '@/interfaces';
import formatTime from "@/utils/formatTime.ts";

interface AgentMessageListProps {
    messages: Message[];
    clientName: string;
}

const AgentMessageList: React.FC<AgentMessageListProps> = ({messages}) => {
    // رفرنس برای اسکرول به آخرین پیام
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // اسکرول به پایین لیست پیام‌ها پس از اضافه شدن پیام جدید
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (
        <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        گفتگو را شروع کنید
                    </div>
                ) : (
                    messages.map((message) => (
                        <>
                            {
                                message.isFromAgent ?
                                    <div className={"flex items-center justify-start gap-x-2"}>
                                        <div
                                            className={"bg-white max-w-[540px] border border-gray-300 rounded-xl rounded-br-none shadow-input"}>
                                            <span className={"leading-5 inline-block text-xs p-2"}>{message.text}</span>
                                        </div>
                                        <div className={""}>
                                            <span className={"text-[8px]"}>{formatTime(message.timestamp)}</span>
                                        </div>
                                    </div> :
                                    <div className={"flex items-center flex-row-reverse justify-start gap-x-2"}>
                                        <div
                                            className={"bg-green-600 max-w-[540px] text-white border border-gray-300 rounded-xl rounded-bl-none shadow-input"}>
                                            <span className={"leading-5 inline-block text-xs p-2"}>{message.text}</span>
                                        </div>
                                        <div className={""}>
                                            <span className={"text-[8px]"}>{formatTime(message.timestamp)}</span>
                                        </div>
                                    </div>
                            }
                        </>
                    ))
                )}
                <div ref={messagesEndRef}/>
            </div>
        </>
    )
        ;
};

export default AgentMessageList;
