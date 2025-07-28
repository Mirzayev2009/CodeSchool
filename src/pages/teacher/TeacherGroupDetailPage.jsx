import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUsers, FaBook, FaCalendarAlt, FaClock } from 'react-icons/fa';

const weekdays = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];

const TeacherGroupDetailsPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const today = new Date().toISOString().split('T')[0];
 

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
       <div className='flex '>
         <h1 className="text-3xl font-bold flex items-center gap-3">
          📘 {group.name}
        </h1>
        <div>
          <button>
             back to groups
          </button>
        </div>
       </div>

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
          {group.dates.map((date) => {
  const isToday = date === today;
  return (
    <button
      key={date}
      onClick={() => navigate(`/teacher-dashboard/group/${groupId}/lesson/${date}`)}
      className={`font-medium py-2 px-4 rounded-lg text-sm transition 
        ${isToday 
          ? 'bg-green-600 hover:bg-green-700 text-white shadow-md scale-[1.03]' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
    >
      📅 {date} {isToday && <span className="ml-1 font-bold"></span>}
    </button>
  );
})}

            </div>
          </div>
        </div>

        {/* Student List */}
      <div className="bg-[#1f2e35] border border-orange-400 rounded-xl p-6 shadow-md">
  <h2 className="text-xl font-bold text-orange-300 flex items-center gap-2 mb-4">
    🧑‍🎓 Talabalar Ro‘yxati
    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-md">
      {group.students.length} ta
    </span>
  </h2>

  {group.students.length === 0 ? (
    <p className="text-gray-400 italic">Talabalar mavjud emas</p>
  ) : (
    <ul className="divide-y divide-orange-500/30 text-sm">
      {group.students.map((student, index) => (
        <li key={student.id} className="py-2 pl-1">
          <span className="text-white">{index + 1}.</span> {student.name}
        </li>
      ))}
    </ul>
  )}
</div>

      </div>
    </div>
  );
};

export default TeacherGroupDetailsPage;
