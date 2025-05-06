import React, { useState, useEffect } from 'react';
import ClientMessageInput from '@/components/client/ClientMessageInput';
import ClientRegistration from '@/components/client/ClientRegistration';
import ClientMessageList from "@/components/client/ClientMessageList.tsx";
import socketService from "@/services/socketService.tsx";
import { Message } from '@/interfaces';

const ClientChat: React.FC = () => {
    // وضعیت‌های کامپوننت
    const [isRegistered, setIsRegistered] = useState(false);
    const [clientId, setClientId] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    // اتصال به سوکت و دریافت پیام‌ها
    useEffect(() => {
        if (isRegistered && clientId) {
            // اتصال به سوکت
             socketService.connect();

            // دریافت تاریخچه گفتگو
            socketService.getClientConversation(clientId).then((response) => {
                if (response.success && response.data) {
                    setMessages(response.data.messages);
                }
            });

            // گوش دادن به پیام‌های جدید
            socketService.onMessage((message: Message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            // قطع اتصال هنگام خروج از کامپوننت
            return () => {
                socketService.disconnect();
            };
        }
    }, [isRegistered, clientId]);

    // ثبت کاربر جدید
    const handleRegistration = (newClientId: string) => {
        setClientId(newClientId);
        setIsRegistered(true);
    };

    // ارسال پیام
    const handleSendMessage = (text: string) => {
        socketService.sendUserMessage(clientId, text);
    };

    // نمایش فرم ثبت‌نام یا چت بر اساس وضعیت ثبت‌نام
    if (!isRegistered) {
        return <ClientRegistration onRegistered={handleRegistration} />;
    }

    return (
        <div className="min-h-screen bg-gray-200">
            <div className="w-full bg-white max-w-[366px] h-full min-h-[528px] mx-auto flex flex-col rounded-t-xl rounded-b-xl overflow-hidden border border-gray-50">
                {/* هدر */}
                <div className="flex items-center gap-x-2 bg-green-600 h-16 p-3 pb-2">
                    <div className="bg-green-200 border-2 border-white rounded-full w-9 h-9 flex items-center justify-center">
                        <span className="h-3.5 text-xs font-medium text-purple-950">JD</span>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <span className="text-sm font-medium text-white">پشتیبانی آنلاین</span>
                        <span className="text-xs font-medium text-slate-300">پاسخگوی سوالات شما هستیم</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <ClientMessageList messages={messages} />
                    <ClientMessageInput onSendMessage={handleSendMessage} />
                </div>
            </div>
        </div>
    );
};

export default ClientChat;