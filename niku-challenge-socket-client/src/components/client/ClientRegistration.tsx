import React, { useState } from 'react';
import socketService from "@/services/socketService.tsx";

interface ClientRegistrationProps {
  onRegistered: (clientId: string, name: string) => void;
}

const ClientRegistration: React.FC<ClientRegistrationProps> = ({ onRegistered }) => {
  const [name, setName] = useState('');

  // تولید یک شناسه منحصر به فرد برای کاربر
  const generateClientId = (): string => {
    return 'client_' + Math.random().toString(36).substring(2, 10);
  };

  // ثبت کاربر جدید
  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim()) {
      // ایجاد شناسه کاربر
      const clientId = generateClientId();

      // اتصال به سوکت
      socketService.connect();

      // ثبت کاربر
      socketService.registerUser(clientId, name);

      // اعلام ثبت موفق به کامپوننت والد
      onRegistered(clientId, name);
    }
  };

  return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">سلام خوش آمدید</h2>
        <p className="mb-4 text-center">لطفاً نام خود را وارد کنید تا گفتگو را شروع کنیم</p>

        <form onSubmit={handleRegistration} className="space-y-4">
          <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام خود را وارد کنید"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                dir="rtl"
            />
          </div>

          <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors"
          >
            شروع گفتگو
          </button>
        </form>
      </div>
  );
};

export default ClientRegistration;