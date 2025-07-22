import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUsers, FaBook, FaCalendarAlt, FaClock } from 'react-icons/fa';

const weekdays = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];

const TeacherGroupDetailsPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    fetch('/data/groups.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((g) => g.id === groupId);
        setGroup(found || null);
      });
  }, [groupId]);

  if (!group) return <div className="text-white p-6">⏳ Yuklanmoqda...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          📘 {group.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Group Info */}
          <div className="bg-[#1f2e35] border border-green-400 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold">📋 Guruh Ma'lumotlari</h2>
            <p><FaBook className="inline mr-2 text-green-300" /> Fan: {group.subject}</p>
            <p><FaUsers className="inline mr-2 text-green-300" /> Talabalar soni: {group.students.length}</p>

            <h2 className="text-xl font-semibold mt-6">📆 Haftalik Dars Jadvali</h2>
            <div className="space-y-2">
              {group.schedule?.map((entry, i) => (
                <div key={i} className="flex items-center justify-between bg-blue-600 px-4 py-2 rounded-lg text-sm">
                  <span>📅 {weekdays[entry.weekday]}</span>
                  <span>🕒 {entry.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lesson Dates */}
          <div className="bg-[#1f2e35] border border-blue-400 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">📅 Dars kunlari</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {group.dates.map((date) => (
                <button
                  key={date}
                  onClick={() => navigate(`/teacher-dashboard/group/${groupId}/lesson/${date}`)}
                  className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 px-4 rounded-lg text-sm"
                >
                  📅 {date}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-[#1f2e35] border border-orange-400 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">🧑‍🎓 Talabalar Ro‘yxati</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {group.students.map((student) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherGroupDetailsPage;
