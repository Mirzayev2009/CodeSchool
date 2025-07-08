import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher } from 'react-icons/fa';

const teacher = {
  id: 't1',
  name: 'Umidbek',
  subject: 'AI',
  groups: [
    { id: 'g1', name: 'AI Bootcamp (Morning)' },
    { id: 'g2', name: 'AI Bootcamp (Evening)' },
  ],
};

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <FaChalkboardTeacher className="mx-auto text-6xl text-green-400 animate-pulse drop-shadow-glow" />
          <h1 className="text-5xl font-extrabold tracking-tight mt-4 drop-shadow-glow">
            Welcome, <span className="text-green-300">{teacher.name}</span> 👨‍🏫
          </h1>
          <p className="text-lg mt-2 text-gray-300">Your subject: <strong className="text-white">{teacher.subject}</strong></p>
        </div>

        {/* Groups */}
        <h2 className="text-2xl font-bold mb-6 text-green-100 tracking-wider uppercase">💼 Your Groups</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teacher.groups.map((group) => (
            <div
              key={group.id}
              onClick={() => navigate(`/teacher-dashboard/group/${group.id}`)}
              className="cursor-pointer p-6 rounded-2xl border-2 border-green-400 bg-gradient-to-br from-green-600 via-green-500 to-green-400 shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 hover:shadow-green-500/50"
            >
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-glow">
                {group.name}
              </h3>
              <p className="text-green-100 font-medium">Tap to manage this group</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

