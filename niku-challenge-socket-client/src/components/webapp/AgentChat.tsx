import React, {useState, useEffect} from 'react';
import AgentMessageList from "@/components/webapp/AgentMessageList.tsx";
import AgentMessageInput from "@/components/webapp/AgentMessageInput.tsx";
import socketService from "@/services/socketService.tsx";
import UsersList from "@/components/webapp/UsersList.tsx";
import {Client, Conversation, Message} from '@/interfaces';

const AgentChat: React.FC = () => {
    // وضعیت‌های کامپوننت
    const [clients, setClients] = useState<Client[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

    // اتصال به سوکت و دریافت داده‌ها
    useEffect(() => {
        // اتصال به سوکت
        socketService.connect();

        // ثبت پشتیبان
        socketService.registerAgent();

        // گوش دادن به گفتگوهای موجود
        socketService.onExistingConversations((data) => {
            setClients(data.clients);
            setConversations(data.conversations);
        });

        // گوش دادن به اتصال کاربران جدید
        socketService.onUserConnected((data) => {
            setClients((prevClients) => {
                // بررسی وجود کاربر در لیست
                const existingClientIndex = prevClients.findIndex(
                    (c) => c.id === data.clientId
                );

                if (existingClientIndex >= 0) {
                    // به‌روزرسانی کاربر موجود
                    const updatedClients = [...prevClients];
                    updatedClients[existingClientIndex] = {
                        id: data.clientId,
                        name: data.name,
                        socketId: updatedClients[existingClientIndex].socketId,
                    };
                    return updatedClients;
                } else {
                    // افزودن کاربر جدید
                    return [
                        ...prevClients,
                        {
                            id: data.clientId,
                            name: data.name,
                            socketId: '', // socketId در سمت پشتیبان اهمیت ندارد
                        },
                    ];
                }
            });

            setConversations((prevConversations) => {
                // بررسی وجود گفتگو در لیست
                const existingConvIndex = prevConversations.findIndex(
                    (c) => c.clientId === data.clientId
                );

                if (existingConvIndex >= 0) {
                    // به‌روزرسانی گفتگوی موجود
                    const updatedConversations = [...prevConversations];
                    updatedConversations[existingConvIndex] = data.conversation;
                    return updatedConversations;
                } else {
                    // افزودن گفتگوی جدید
                    return [...prevConversations, data.conversation];
                }
            });
        });

        // گوش دادن به قطع اتصال کاربران
        socketService.onUserDisconnected((data) => {
            setClients((prevClients) =>
                prevClients.filter((client) => client.id !== data.clientId)
            );
        });

        // گوش دادن به پیام‌های جدید کاربران
        socketService.onNewUserMessage((data) => {
            // به‌روزرسانی گفتگوها
            setConversations((prevConversations) => {
                const updatedConversations = [...prevConversations];
                const index = updatedConversations.findIndex(
                    (c) => c.clientId === data.conversation.clientId
                );

                if (index >= 0) {
                    updatedConversations[index] = data.conversation;
                } else {
                    updatedConversations.push(data.conversation);
                }

                return updatedConversations;
            });

            // به‌روزرسانی پیام‌های نمایش داده شده
            if (selectedClientId === data.message.clientId) {
                setCurrentMessages((prevMessages) => [...prevMessages, data.message]);

                // بازنشانی تعداد پیام‌های خوانده نشده
                setConversations((prevConversations) => {
                    const updatedConversations = [...prevConversations];
                    const index = updatedConversations.findIndex(
                        (c) => c.clientId === selectedClientId
                    );

                    if (index >= 0) {
                        updatedConversations[index] = {
                            ...updatedConversations[index],
                            unread: 0,
                        };
                    }

                    return updatedConversations;
                });
            }
        });

        // قطع اتصال هنگام خروج از کامپوننت
        return () => {
            socketService.disconnect();
        };
    }, [selectedClientId]);

    // انتخاب کاربر برای گفتگو
    const handleSelectClient = (clientId: string) => {
        setSelectedClientId(clientId);

        // یافتن اطلاعات کاربر
        const client = clients.find((c) => c.id === clientId);
        setSelectedClient(client || null);

        // یافتن پیام‌های گفتگو
        const conversation = conversations.find((c) => c.clientId === clientId);
        setCurrentMessages(conversation ? conversation.messages : []);

        // بازنشانی تعداد پیام‌های خوانده نشده
        setConversations((prevConversations) => {
            const updatedConversations = [...prevConversations];
            const index = updatedConversations.findIndex((c) => c.clientId === clientId);

            if (index >= 0) {
                updatedConversations[index] = {
                    ...updatedConversations[index],
                    unread: 0,
                };
            }

            return updatedConversations;
        });
    };

    // ارسال پیام به کاربر
    const handleSendMessage = (text: string) => {
        if (selectedClientId) {
            socketService.sendAgentMessage(selectedClientId, text);

            // افزودن پیام جدید به لیست پیام‌ها
            const newMessage: Message = {
                id: Date.now().toString(),
                text,
                clientId: selectedClientId,
                timestamp: new Date(),
                isFromAgent: true,
            };

            setCurrentMessages((prevMessages) => [...prevMessages, newMessage]);
        }
    };

    return (
        <div className="h-screen bg-gray-100 w-full flex">
            <UsersList
                clients={clients}
                conversations={conversations}
                selectedClientId={selectedClientId}
                onSelectClient={handleSelectClient}
            />

            <div className="w-full flex flex-col justify-between">
                <AgentMessageList
                    messages={currentMessages}
                    clientName={selectedClient?.name || ''}
                />
                <AgentMessageInput
                    onSendMessage={handleSendMessage}
                    disabled={!selectedClientId}
                />
            </div>
        </div>
    );
};

export default AgentChat;