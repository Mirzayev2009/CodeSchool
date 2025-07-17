import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaChalkboardTeacher, FaLayerGroup } from 'react-icons/fa';
import { BookOpenCheck, CalendarDays } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [groups, setGroups] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherRes = await fetch('/data/teacher.json');
        const teacherData = await teacherRes.json();

        const groupRes = await fetch('/data/groups.json');
        const groupData = await groupRes.json();

        // Match full group data based on teacher's group IDs
        const matchedGroups = groupData.filter((g) =>
          teacherData.groups.some((tg) => tg.id === g.id)
        );

        setTeacher(teacherData);
        setGroups(matchedGroups);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    fetchData();
  }, []);

  if (!teacher) {
    return <div className="text-white p-6">Yuklanmoqda...</div>;
  }

  const totalStudents = groups.reduce((sum, g) => sum + g.students.length, 0);
  const todaysGroups = groups.filter((g) => Array.isArray(g.dates) && g.dates.includes(today));

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Welcome block */}
          <div className="bg-gradient-to-br from-[#1a2e3a] to-[#294759] rounded-xl shadow-xl p-6 flex items-center gap-6 border border-green-600">
            <FaChalkboardTeacher className="text-5xl text-green-400" />
            <div>
              <h1 className="text-3xl font-bold">Xush kelibsiz, {teacher.name}</h1>
              <p className="text-sm text-gray-300">Fan: <span className="text-white">{teacher.subject}</span></p>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-[#1a2e3a] to-[#294759] border border-green-500 text-white shadow-md">
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Jami guruhlar</CardTitle>
                <FaLayerGroup className="text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{groups.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a2e3a] to-[#294759] border border-blue-500 text-white shadow-md">
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Bugungi darslar</CardTitle>
                <CalendarDays className="text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todaysGroups.length}</div>
                {todaysGroups.length > 0 ? (
                  <p className="text-sm text-gray-300">
                    {todaysGroups.map(g => g.name).join(', ')}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">Bugun dars yo‘q</p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a2e3a] to-[#294759] border border-orange-500 text-white shadow-md">
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">O'quvchilar</CardTitle>
                <BookOpenCheck className="text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
              </CardContent>
            </Card>
          </div>

          {/* Today’s lessons */}
          <div>
            <h2 className="text-xl font-bold text-green-200 mb-4">💼 Bugungi darslar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {todaysGroups.map(group => (
                <Card
                  key={group.id}
                  onClick={() => navigate(`/teacher-dashboard/group/${group.id}`)}
                  className="cursor-pointer bg-gradient-to-br from-[#1c2d38] to-[#2a4256] border border-green-500 text-white shadow-lg hover:scale-105 transition transform"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-green-300">{group.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-300">
                    <p>Talabalar soni: {group.students.length}</p>
                    <p className="text-xs text-green-100 mt-1">Bosing va darsni boshqaring</p>
                  </CardContent>
                </Card>
              ))}
              {todaysGroups.length === 0 && (
                <p className="text-gray-400 text-sm">💼 Bugun dars yo‘q</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;