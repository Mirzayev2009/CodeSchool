  import React, { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { FaUsers, FaUserGraduate, FaBook, FaClock } from 'react-icons/fa';
  import TeacherLayout from './TeacherLayout';


  const TeacherGroupsPage = () => {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      fetch('/data/groups.json')
        .then((res) => res.json())
        .then(setGroups)
        .catch((err) => console.error('Failed to load groups:', err));
    }, []);
  
  
  const getUniqueWeekCount = (dates) => {
  const weekSet = new Set();

  dates.forEach(dateStr => {
    const date = new Date(dateStr);
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const pastDays = (date - firstDay) / (1000 * 60 * 60 * 24);
    const week = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
    weekSet.add(`${date.getFullYear()}-W${week}`);
  });

  return weekSet.size;
};


    return (
      <TeacherLayout>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FaUsers className="text-green-400" />
              Barcha Guruhlar
            </h1>

            {groups.length === 0 ? (
              <p className="text-gray-300">⏳ Yuklanmoqda yoki guruhlar mavjud emas.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="bg-[#1f2e35] border border-green-300 rounded-xl shadow-xl p-6 hover:border-green-500 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-green-200">{group.name}</h3>
                      <FaBook className="text-green-400 text-xl" />
                    </div>

                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaUserGraduate className="text-green-400" />
                        <span>Talabalar soni: {group.students.length}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaBook className="text-green-400" />
                        <span>Fan: {group.subject}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-green-400" />
                      <span>Haftalik darslar: {getUniqueWeekCount(group.dates)} ta</span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/teacher-dashboard/group-detail/${group.id}`)}
                      className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all"
                    >
                      📂 Guruhni ko‘rish
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
      </TeacherLayout>
    );
  };

  export default TeacherGroupsPage;

