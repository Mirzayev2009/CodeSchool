import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate } from 'react-icons/fa';

const student = {
  name: 'Ali Hasanov',
  level: 'Intermediate',
  joined: '2024-03-01',
};

const groups = [
  { id: 'g1', name: 'AI Bootcamp', subject: 'Artificial Intelligence' },
  { id: 'g2', name: 'English Advanced', subject: 'English' },
  { id: 'g3', name: 'Frontend Pro', subject: 'Coding' },
];

const StudentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Student Info Card */}
        <div className="bg-[#1f2e35] p-8 rounded-3xl shadow-2xl border border-green-400">
          <div className="flex items-center gap-4 mb-4">
            <FaUserGraduate className="text-4xl text-green-300 animate-pulse" />
            <h1 className="text-3xl font-bold text-green-100">Welcome, {student.name}</h1>
          </div>
          <div className="text-md text-gray-300 space-y-1">
            <p>
              <span className="font-semibold text-green-400">Level:</span> {student.level}
            </p>
            <p>
              <span className="font-semibold text-green-400">Joined on:</span>{' '}
              {new Date(student.joined).toDateString()}
            </p>
          </div>
        </div>

        {/* Groups List */}
        <div>
          <h2 className="text-2xl font-bold text-green-200 mb-6">📚 Your Groups</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {groups.map((group) => (
              <div
                key={group.id}
                onClick={() => navigate(`/student-dashboard/group/${group.id}`)}
                className="cursor-pointer bg-[#2a3a44] p-6 rounded-2xl border border-green-400 shadow-xl hover:shadow-green-600/40 hover:scale-105 transition-all"
              >
                <h3 className="text-xl font-bold text-green-100 mb-1">{group.name}</h3>
                <p className="text-gray-300">{group.subject}</p>
                <span className="block mt-3 text-sm text-green-400 font-semibold">
                  View Homeworks →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;




