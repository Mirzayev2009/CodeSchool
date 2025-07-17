import React from 'react';
import Sidebar from '@/components/Sidebar';
import { FaCog, FaUser, FaBell, FaMoon } from 'react-icons/fa';

const teacher = {
  name: 'Umidbek',
  subject: 'AI',
  email: 'umidbek@example.com',
};

const TeacherSettingsPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <FaCog className="text-green-400" />
            Sozlamalar
          </h1>

          {/* Profile Settings */}
          <div className="bg-[#1f2e35] p-6 rounded-xl border border-green-400 shadow mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaUser className="text-green-400" /> Shaxsiy Ma'lumotlar
            </h2>
            <div className="space-y-2 text-gray-300 text-sm">
              <p><strong>Ism:</strong> {teacher.name}</p>
              <p><strong>Fan:</strong> {teacher.subject}</p>
              <p><strong>Email:</strong> {teacher.email}</p>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-[#1f2e35] p-6 rounded-xl border border-green-400 shadow mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaBell className="text-green-400" /> Xabarnomalar
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm text-gray-200">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                Email orqali ogohlantirishlar
              </label>
              <label className="flex items-center gap-3 text-sm text-gray-200">
                <input type="checkbox" className="w-5 h-5" />
                SMS ogohlantirishlar
              </label>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-[#1f2e35] p-6 rounded-xl border border-green-400 shadow mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaMoon className="text-green-400" /> Mavzu (Theme)
            </h2>
            <p className="text-gray-400 text-sm">Dark mode hozircha standart sifatida ishlamoqda.</p>
          </div>

          {/* Logout */}
          <div className="text-right">
            <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded font-semibold transition">
              ⛔ Chiqish
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherSettingsPage;
