// ✅ REFINED STUDENT DASHBOARD — PREMIUM LOOK, ELEGANT COLORS, GOLDEN HOVERS, RESPONSIVE LAYOUT

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, BookOpenCheck, Sun, Moon, LogOut, User, Ghost } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isToday,
  subMonths,
  addMonths,
} from 'date-fns';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

const student = {
  name: 'Ali Hasanov',
  level: 'Intermediate',
  joined: '2024-03-01',
};

const StudentPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const { theme, setTheme } = useTheme();
  const [showLogoutCard, setShowLogoutCard] = useState(false);


  useEffect(() => {
    fetch('/data/groups.json')
      .then((res) => res.json())
      .then((data) => setGroups(data));

    const all = {};
    ['g1', 'g2', 'g3'].forEach((id) => {
      const saved = JSON.parse(localStorage.getItem(`attendance-${id}`));
      if (saved) all[id] = saved;
    });
    setAttendanceData(all);
  }, []);

  const getPresentDates = () => {
    const presentDates = new Set();
    for (const groupId in attendanceData) {
      for (const date in attendanceData[groupId]) {
        if (attendanceData[groupId][date]['student1']) presentDates.add(date);
      }
    }
    return presentDates;
  };

  const presentDates = getPresentDates();
  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);
  const weekStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const days = [];
  let day = weekStart;

  while (day <= monthEnd || days.length % 7 !== 0) {
    const dateStr = format(day, 'yyyy-MM-dd');
    const isPresent = presentDates.has(dateStr);
    const inMonth = isSameMonth(day, selectedMonth);
    const isCurrent = isToday(day);

    days.push(
      <div
        key={dateStr}
        title={`${format(day, 'dd MMM yyyy')} — ${isPresent ? '✅ Present' : '—'}`}
        className={`w-full aspect-square max-w-[30px] max-h-[30px] rounded-md flex items-center justify-center font-semibold transition-all
        ${isPresent ? 'bg-green-600 text-white' : 'text-gray-400'}
        ${isCurrent ? 'border border-yellow-400' : ''}
        ${inMonth ? '' : 'opacity-30'}
        hover:bg-yellow-400 hover:text-black hover:scale-110 cursor-pointer`}
      >
        {format(day, 'd')}
      </div>
    );
    day = addDays(day, 1);
  }

  return (
  <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]' : 'bg-gradient-to-br from-[#c3c9cc] via-[#dfe4e6] to-[#f2f5f7]'}`}>
      {/* 🧠 TOPBAR */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-emerald-800 to-green-500 shadow-lg backdrop-blur-sm">
        <h1 className="text-xl font-bold text-white flex items-center gap-2 hover:text-yellow-400 transition-all drop-shadow">
          <BookOpenCheck className="w-6 h-6" /> Student Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun className="w-5 h-5 hover:text-yellow-400 transition" /> : <Moon className="w-8 h-8 hover:text-yellow-400 transition" />}
          </Button>
          <Button onClick={() => navigate('/student-dashboard/profile')} className="hover:text-yellow-400 transition text-white" variant="ghost">
            <User className="h-5 w-5 hover:text-yellow-400 transition" /> 
          </Button>
          <Button
  size="icon"
  variant="ghost"
  title="Log out"
  onClick={() => setShowLogoutCard(true)}
>
  <LogOut className="h-5 w-5 text-red-500 hover:text-yellow-400 transition" />
</Button>

        </div>
      </div>
<main className="p-6 space-y-6">
    {/* Student Info Card */}
    <Card className={`transition-colors duration-300 ${theme === 'dark' 
      ? 'bg-[#1f2e35] border-green-500 text-green-100' 
      : 'bg-white border-green-400 text-gray-800'}`}>
      <CardHeader>
        <CardTitle className={`font-semibold ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`}>
          Welcome, {student.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-1">
        <p>
          Level: <span className="font-medium hover:text-yellow-400">{student.level}</span>
        </p>
        <p>
          Joined: <span className="font-medium hover:text-yellow-400">{new Date(student.joined).toDateString()}</span>
        </p>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* GROUPS */}
      <div>
        <h2 className={`mb-3 font-bold text-lg transition ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} hover:text-yellow-400`}>
          Your Groups
        </h2>
        <div className="space-y-4">
          {groups.map(group => (
            <Card
              key={group.id}
              onClick={() => navigate(`/student-dashboard/group/${group.id}`)}
              className={`cursor-pointer transition transform hover:scale-[1.02] 
                ${theme === 'dark'
                  ? 'bg-[#1f2e35] text-green-100 border-green-400 hover:border-yellow-400'
                  : 'bg-white text-gray-700 border-green-300 hover:border-yellow-400'}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpenCheck className="w-4 h-4" />
                  {group.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground hover:text-yellow-400">
                {group.subject}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ATTENDANCE */}
      <div>
        <h2 className={`mb-3 flex items-center gap-2 font-bold text-lg transition ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} hover:text-yellow-400`}>
          <Calendar className="w-5 h-5" /> Attendance
        </h2>
        <Card className={`transition-colors duration-300 ${theme === 'dark' 
          ? 'bg-[#1f2e35] border-green-500 text-green-100' 
          : 'bg-white border-green-400 text-gray-800'}`}>
          <CardHeader className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedMonth(prev => subMonths(prev, 1))} className="hover:text-yellow-400">←</Button>
              <span className="font-semibold text-sm">{format(selectedMonth, 'MMMM yyyy')}</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedMonth(prev => addMonths(prev, 1))} className="hover:text-yellow-400">→</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`grid grid-cols-7 text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`}>
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
                <div key={d} className="text-center">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-[2px] text-xs">
              {days.map((cell, i) => React.cloneElement(cell, { key: i }))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
  {showLogoutCard && (
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
    <div className={`w-full max-w-sm p-6 rounded-xl shadow-xl border transition-colors duration-300
      ${theme === 'dark'
        ? 'bg-[#1f2e35] border-green-600 text-white'
        : 'bg-white border-green-400 text-gray-800'}`}>

      <h2 className="text-xl font-bold mb-4 text-center">Log out?</h2>
      <p className="text-sm text-center mb-6 text-muted-foreground">
        Are you sure you want to log out? You’ll need to log in again to access your dashboard.
      </p>

      <div className="flex justify-between gap-4">
        <Button
          onClick={() => setShowLogoutCard(false)}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            localStorage.clear();
            navigate('/login'); // Redirect to login page or home
          }}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white"
        >
          Confirm
        </Button>
      </div>
    </div>
  </div>
)}

</div>
  )
}
export default StudentPage;
