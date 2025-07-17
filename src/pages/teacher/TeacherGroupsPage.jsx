import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaUserGraduate } from 'react-icons/fa';
import Sidebar from '@/components/Sidebar';

const TeacherGroupDetailsPage = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/groups.json')
      .then(res => res.json())
      .then(groups => {
        const found = groups.find(g => g.id === groupId);
        setGroup(found || null);
      });
  }, [groupId]);

  if (!group) {
    return <div className="text-white p-6">⏳ Yuklanmoqda...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="bg-[#1f2e35] rounded-xl p-6 border border-green-500 shadow-lg">
            <h1 className="text-3xl font-bold text-green-200 mb-2">{group.name}</h1>
            <p className="text-gray-300">Fan: <span className="text-white">{group.subject}</span></p>
            <p className="text-gray-300 mt-1">Talabalar soni: {group.students.length}</p>
          </div>

          <div className="bg-[#1f2e35] rounded-xl p-6 border border-green-500 shadow-lg">
            <h2 className="text-2xl font-semibold text-green-300 mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-green-400" />
              Dars Sanalari
            </h2>

            {group.dates.length === 0 ? (
              <p className="text-gray-400">📭 Hech qanday sana mavjud emas.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {group.dates.map(date => (
                  <button
                    key={date}
                    onClick={() => navigate(`/teacher-dashboard/group/${group.id}/date/${date}`)}
                    className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-full text-sm font-medium border border-green-300"
                  >
                    {date}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#1f2e35] rounded-xl p-6 border border-green-500 shadow-lg">
            <h2 className="text-2xl font-semibold text-green-300 mb-3">👥 Talabalar ro‘yxati</h2>
            <ul className="list-disc list-inside text-gray-200">
              {group.students.map(student => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherGroupDetailsPage;
