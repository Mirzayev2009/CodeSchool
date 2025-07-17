import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaUsers, FaBook, FaCalendarAlt, FaClock } from 'react-icons/fa';

const TeacherGroupDetailsPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetch('/data/groups.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((g) => g.id === groupId);
        setGroup(found || null);
      });
  }, [groupId]);

  if (!group) {
    return <div className="text-white p-6">⏳ Yuklanmoqda...</div>;
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-4">📘 {group.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1f2e35] p-5 rounded-xl border border-green-400">
            <h2 className="text-xl font-semibold mb-3">📋 Guruh Ma'lumotlari</h2>
            <p><FaBook className="inline mr-2 text-green-300" /> Fan: {group.subject}</p>
            <p><FaUsers className="inline mr-2 text-green-300" /> Talabalar soni: {group.students.length}</p>
            <p><FaCalendarAlt className="inline mr-2 text-green-300" /> Dars kunlari: {group.dates.join(', ')}</p>
          </div>

          <div className="bg-[#1f2e35] p-5 rounded-xl border border-blue-400">
            <h2 className="text-xl font-semibold mb-3">📅 Kalendar orqali tanlash</h2>
            <Calendar
              onChange={(date) => setSelectedDate(date.toISOString().split('T')[0])}
              tileClassName={({ date, view }) =>
                view === 'month' && group.dates.includes(date.toISOString().split('T')[0])
                  ? 'bg-green-500 text-white'
                  : null
              }
            />

            {selectedDate && (
              <div className="mt-4">
                <p>Sana tanlandi: <span className="text-green-300 font-semibold">{selectedDate}</span></p>
                <button
                  onClick={() => navigate(`/teacher-dashboard/group/${groupId}/lesson/${selectedDate}`)}
                  className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  🔍 Ushbu kunni ko‘rish
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#1f2e35] p-5 rounded-xl border border-orange-400">
          <h2 className="text-xl font-semibold mb-3">🧑‍🎓 Talabalar Ro‘yxati</h2>
          <ul className="list-disc list-inside space-y-1">
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
