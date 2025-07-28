import React, { useEffect, useState } from 'react';
import { FaCog, FaUser, FaBell, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import TeacherLayout from './TeacherLayout';

const TeacherSettingsPage = () => {
  const [teacher, setTeacher] = useState({ name: '', subject: '', email: '' });
  const [notifications, setNotifications] = useState({ email: true, sms: false });
  const [theme, setTheme] = useState('dark');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('teacher-settings') || '{}');
    setTeacher(savedData.teacher || {
      name: 'Umidbek',
      subject: 'AI',
      email: 'umidbek@example.com'
    });
    setNotifications(savedData.notifications || { email: true, sms: false });
    setTheme(savedData.theme || 'dark');
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      'teacher-settings',
      JSON.stringify({ teacher, notifications, theme })
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <TeacherLayout>
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2 border-b border-green-500 pb-2">
          <FaCog className="text-green-400" /> Settings
        </h1>

        {/* Profile */}
        <div className="bg-[#1a252f] p-5 border border-[#2e444e] mb-6 rounded-lg">
          <h2 className="text-lg text-green-300 font-medium mb-4 flex items-center gap-2">
            <FaUser /> Profile Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <input
              className="bg-[#273843] border border-gray-600 p-2 text-white"
              value={teacher.name}
              onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
              placeholder="Name"
            />
            <input
              className="bg-[#273843] border border-gray-600 p-2 text-white"
              value={teacher.subject}
              onChange={(e) => setTeacher({ ...teacher, subject: e.target.value })}
              placeholder="Subject"
            />
            <input
              className="sm:col-span-2 bg-[#273843] border border-gray-600 p-2 text-white"
              value={teacher.email}
              onChange={(e) => setTeacher({ ...teacher, email: e.target.value })}
              placeholder="Email"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[#1a252f] p-5 border border-[#2e444e] mb-6 rounded-lg">
          <h2 className="text-lg text-green-300 font-medium mb-4 flex items-center gap-2">
            <FaBell /> Notifications
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-300">
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() =>
                  setNotifications((p) => ({ ...p, email: !p.email }))
                }
              />
              Email Alerts
            </label>
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={() =>
                  setNotifications((p) => ({ ...p, sms: !p.sms }))
                }
              />
              SMS Alerts
            </label>
          </div>
        </div>

        {/* Theme toggle */}
        <div className="bg-[#1a252f] p-5 border rounded-lg border-[#2e444e] mb-6 flex justify-between items-center">
          <h2 className="text-lg text-green-300 font-medium flex items-center gap-2">
            <FaMoon /> Theme
          </h2>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-white border border-gray-500 px-4 py-1 rounded hover:bg-[#2c3c47]"
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center">
          <div className="text-green-400 text-sm">{saved && '✔️ Changes saved'}</div>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              className="border border-red-500 text-red-400 px-5 py-2 rounded hover:bg-red-600 hover:text-white transition"
            >
              <FaSignOutAlt className="inline mr-2" /> Logout
            </button>
          </div>
        </div>
      </motion.div>
    </TeacherLayout>
  );
};

export default TeacherSettingsPage;
