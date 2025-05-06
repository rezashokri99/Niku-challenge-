import React from 'react';
import {Client, Conversation} from '@/interfaces';

interface UsersListProps {
    clients: Client[];
    conversations: Conversation[];
    selectedClientId: string | null;
    onSelectClient: (clientId: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({
                                                 clients,
                                                 conversations,
                                                 selectedClientId,
                                                 onSelectClient,
                                             }) => {
    // یافتن تعداد پیام‌های خوانده نشده برای هر کاربر
    const getUnreadCount = (clientId: string): number => {
        const conversation = conversations.find((conv) => conv.clientId === clientId);
        return conversation ? conversation.unread : 0;
    };

    return (
        <div className="w-1/3 bg-white border-l max-w-[340px]">
            <h1 className={"p-6 text-xl border-b border-gray-300"}>
                لیست کاربران
            </h1>
            <div className={"divide-y divide-gray-300"}>
                {clients.map((client) => (
                    <div
                        key={client.id}
                        className={`px-6 py-3 cursor-pointer hover:bg-gray-200 ${
                            selectedClientId === client.id ? 'bg-gray-200' : ''
                        }`}
                        onClick={() => onSelectClient(client.id)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="text-gray-600 font-medium text-sm">
                                <span className={"text-gray-600 font-medium text-sm"}>کاربر: </span>
                                <span className={"text-black font-medium text-[15px]"}>{client.name}</span>
                            </div>
                            {getUnreadCount(client.id) > 0 && (
                                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {getUnreadCount(client.id)}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {clients.length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                        هیچ کاربر فعالی وجود ندارد
                    </div>
                )}
            </div>
        </div>
    )
        ;
};

export default UsersList;