import React from 'react';
import { useTheme } from '@/components/theme-provider';
import { PieChart, Pie, Cell, Tooltip, RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { UserCircle, Star } from 'lucide-react';

const attendance = [
  { name: 'Present', value: 90 },
  { name: 'Absent', value: 10 },
];
const homework = [{ name: 'Completed', value: 80 }];

const COLORS = ['#22c55e', '#ef4444'];

const student = {
  name: 'Ali Hasanov',
  level: 'Intermediate',
  group: 'AI Bootcamp (Morning)',
  subject: 'Artificial Intelligence',
  joined: '2024-03-01',
  motto: '“Discipline is choosing between what you want now and what you want most.”',
};

export default function StudentProfilePage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen px-6 py-10 ${theme === 'dark' ? 'bg-[#0f172a] text-white' : 'bg-[#f8fafc] text-gray-800'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* LEFT: Profile Info */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] rounded-3xl p-8 shadow-md flex flex-col items-center text-center border dark:border-white/10">
          <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden mb-4 flex items-center justify-center">
            <UserCircle className="w-28 h-28 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-green-600 dark:text-green-300 mb-1">{student.name}</h1>
          <p className="text-sm">{student.level} | {student.group}</p>
          <p className="text-xs text-muted-foreground mt-1">{student.subject}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">Joined: {new Date(student.joined).toDateString()}</p>

          {/* Motto / Quote */}
          <div className="mt-6 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-xl px-4 py-3 text-sm italic">
            {student.motto}
          </div>
        </div>

        {/* RIGHT: Data Visuals */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Attendance Pie */}
          <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-md border dark:border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-green-600 dark:text-green-300">Attendance</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={attendance}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {attendance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Homework Radial Progress */}
          <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-md border dark:border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-green-600 dark:text-green-300">Homework Progress</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={homework} startAngle={180} endAngle={0}>
                <RadialBar
                  minAngle={15}
                  background
                  clockWise
                  dataKey="value"
                  cornerRadius={10}
                  fill="#22c55e"
                />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
            <p className="mt-4 text-center text-sm">
              Completed <span className="font-bold text-green-500">{homework[0].value}%</span> of homework
            </p>
          </div>

          {/* Performance Highlights */}
          <div className="bg-white dark:bg-[#1e293b] col-span-full rounded-3xl p-6 shadow-md border dark:border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-green-600 dark:text-green-300">Performance Highlights</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {[
                { label: 'Accuracy', value: '92%' },
                { label: 'Avg. Score', value: '88/100' },
                { label: 'Skill Tier', value: 'Advanced' },
                { label: 'Quizzes Taken', value: '23' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-300">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
