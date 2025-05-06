// services/socketService.ts
import { io, Socket } from "socket.io-client";
import { Conversation, Message, ConversationResponse, ExistingConversationsData } from "@/interfaces";

// آدرس سرور سوکت
const SERVER_URL = "http://localhost:2000";

// کلاس سرویس سوکت برای مدیریت ارتباطات
class SocketService {
  private socket: Socket | null = null;

  // اتصال به سرور سوکت
  connect(): Socket {
    if (!this.socket) {
      this.socket = io(SERVER_URL);
      console.log("اتصال به سرور سوکت برقرار شد");
    }
    return this.socket;
  }

  // قطع اتصال از سرور سوکت
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log("اتصال سوکت قطع شد");
    }
  }

  // ثبت کاربر جدید
  registerUser(clientId: string, name: string): void {
    if (this.socket) {
      this.socket.emit("register-user", { clientId, name });
      console.log(`کاربر ${name} با شناسه ${clientId} ثبت شد`);
    }
  }

  // ثبت پشتیبان
  registerAgent(): void {
    if (this.socket) {
      this.socket.emit("register-agent");
      console.log("پشتیبان ثبت شد");
    }
  }

  // ارسال پیام توسط کاربر
  sendUserMessage(clientId: string, text: string): void {
    if (this.socket) {
      this.socket.emit("user-message", { clientId, text });
      console.log(`پیام کاربر ${clientId} ارسال شد: ${text}`);
    }
  }

  // ارسال پیام توسط پشتیبان
  sendAgentMessage(clientId: string, text: string): void {
    if (this.socket) {
      this.socket.emit("agent-message", { clientId, text });
      console.log(`پیام پشتیبان به کاربر ${clientId} ارسال شد: ${text}`);
    }
  }

  // دریافت تاریخچه گفتگوی کاربر
  getClientConversation(clientId: string): Promise<ConversationResponse> {
    return new Promise((resolve) => {
      if (this.socket) {
        this.socket.emit("get-client-conversations", { clientId }, (response: ConversationResponse) => {
          console.log(`تاریخچه گفتگوی کاربر ${clientId} دریافت شد`);
          resolve(response);
        });
      } else {
        resolve({ success: false, error: "اتصال سوکت برقرار نیست" });
      }
    });
  }

  // گوش دادن به رویداد دریافت پیام جدید
  onMessage(callback: (message: Message) => void): void {
    if (this.socket) {
      this.socket.on("message", callback);
    }
  }

  // گوش دادن به رویداد اتصال کاربر جدید (برای پشتیبان)
  onUserConnected(callback: (data: { clientId: string; name: string; conversation: Conversation }) => void): void {
    if (this.socket) {
      this.socket.on("user-connected", callback);
    }
  }

  // گوش دادن به رویداد قطع اتصال کاربر (برای پشتیبان)
  onUserDisconnected(callback: (data: { clientId: string }) => void): void {
    if (this.socket) {
      this.socket.on("user-disconnected", callback);
    }
  }

  // گوش دادن به رویداد دریافت گفتگوهای موجود (برای پشتیبان)
  onExistingConversations(callback: (data: ExistingConversationsData) => void): void {
    if (this.socket) {
      this.socket.on("existing-conversations", callback);
    }
  }

  // گوش دادن به رویداد دریافت پیام جدید از کاربر (برای پشتیبان)
  onNewUserMessage(callback: (data: { message: Message; conversation: Conversation }) => void): void {
    if (this.socket) {
      this.socket.on("new-user-message", callback);
    }
  }
}

// ایجاد یک نمونه واحد از سرویس سوکت
export const socketService = new SocketService();
export default socketService;