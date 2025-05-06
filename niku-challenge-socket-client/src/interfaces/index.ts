// نوع پیام
export interface Message {
    id: string;
    text: string;
    clientId: string;
    timestamp: Date;
    isFromAgent: boolean;
}

// نوع کاربر
export interface Client {
    id: string;
    socketId: string;
    name: string;
}

// نوع گفتگو
export interface Conversation {
    clientId: string;
    messages: Message[];
    unread: number;
}

// پاسخ پس از درخواست گفتگوی کاربر
export interface ConversationResponse {
    success: boolean;
    data?: Conversation;
    error?: string;
}

// چت هایی که برای پشتیبان ارسال می‌شود
export interface ExistingConversationsData {
    conversations: Conversation[];
    clients: Client[];
}