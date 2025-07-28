import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { Calendar, BookOpenCheck, Sun, Moon, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  format,
  isSameDay,
  isToday,
  isSameMonth,
} from 'date-fns';

const filterHomeworksBySubject = (homeworkObj, subject) => {
  const filtered = {};
  for (const date in homeworkObj) {
    const subjectHomeworks = homeworkObj[date].filter((hw) => hw.subject === subject);
    if (subjectHomeworks.length > 0) {
      filtered[date] = subjectHomeworks;
    }
  }
  return filtered;
};

const StudentGroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [answers, setAnswers] = useState({});
  const [activeDate, setActiveDate] = useState(null);
  const [activeView, setActiveView] = useState(null); // 'lesson' | 'homework'
  const [results, setResults] = useState({});
  const [lessons, setLessons] = useState({});
  const { theme, setTheme } = useTheme();
  
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetch('/data/groups.json')
      .then((res) => res.json())
      .then((data) => {
        const matchedGroup = data.find((g) => g.id === groupId);
        const saved = JSON.parse(localStorage.getItem(`homeworks-${groupId}`));
        if (saved && matchedGroup) {
          const filtered = filterHomeworksBySubject(saved, matchedGroup.subject);
          setGroup({ ...matchedGroup, homeworksByDate: filtered });
        }
      });
  }, [groupId]);

  useEffect(() => {
    fetch('/data/lessonPlans.json')
      .then((res) => res.json())
      .then((data) => setLessons(data));
  }, []);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (hwId) => {
    const studentAnswer = answers[hwId]?.trim().toLowerCase();
    const hwList = group.homeworksByDate?.[activeDate] || [];
    const hw = hwList.find((h) => h.id === hwId);
    if (!studentAnswer || !hw) return alert('Please provide an answer.');

    const correctAnswer = hw.answer?.trim().toLowerCase() || '';
    const isCorrect = studentAnswer === correctAnswer;
    setResults((prev) => ({ ...prev, [hwId]: isCorrect }));

    const studentId = 'student1';
    const key = `answers-${groupId}-${activeDate}`;
    const existing = JSON.parse(localStorage.getItem(key)) || {};
    const updated = {
      ...existing,
      [studentId]: {
        ...(existing[studentId] || {}),
        [hwId]: {
          answer: answers[hwId],
          correct: isCorrect,
        },
      },
    };
    localStorage.setItem(key, JSON.stringify(updated));
  };

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f2027] text-red-500 text-xl font-bold">
        Group not found or no homework assigned
      </div>
    );
  }

  const dates = Object.keys(group.homeworksByDate || {});

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-emerald-800 to-green-500 shadow-lg backdrop-blur-sm">
        <h1 className="text-xl font-bold text-white flex items-center gap-2 hover:text-yellow-400 transition-all drop-shadow">
          <BookOpenCheck className="w-6 h-6" /> Student Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun className="w-5 h-5 hover:text-yellow-400 transition" /> : <Moon className="w-5 h-5 hover:text-yellow-400 transition" />}
          </Button>
          <Button onClick={() => navigate('/student-dashboard/profile')} className="hover:text-yellow-400 transition">
            <User className="w-4 h-4 mr-2" /> Profile
          </Button>
          <Button onClick={() => alert('Logging out...')} className="hover:text-yellow-400 transition">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>
      {/* Sidebar */}

      <aside className="w-full lg:w-1/4 bg-[#1f2e35] border-r border-green-600 p-6 sticky top-0 h-fit lg:h-screen">
        <button
          onClick={() => navigate('/student-dashboard')}
          className="flex items-center gap-2 text-sm text-green-400 hover:text-yellow-400 transition mb-6"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>

        <h2 className="text-xl font-semibold text-green-200 mb-4">📅 {format(new Date(), 'MMMM yyyy')}</h2>

        <div className="grid grid-cols-7 text-sm text-green-300 mb-2">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
            <div key={d} className="text-center">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-sm">
          {(() => {
            const todayDate = new Date();
            const monthStart = startOfMonth(todayDate);
            const monthEnd = endOfMonth(monthStart);
            const weekStart = startOfWeek(monthStart, { weekStartsOn: 1 });
            const days = [];
            let day = weekStart;

            while (day <= monthEnd || days.length % 7 !== 0) {
              const dayStr = format(day, 'yyyy-MM-dd');
              const isHomeworkDay = dates.includes(dayStr);
              const selected = dayStr === activeDate;
              const today = isToday(day);
              const inMonth = isSameMonth(day, todayDate);

              days.push(
                <button
                  key={dayStr}
                  onClick={() => {
                    setActiveDate(dayStr);
                    setActiveView(null);
                  }}
                  disabled={!isHomeworkDay}
                  className={`aspect-square w-full rounded-lg text-center border
                    ${selected ? 'bg-yellow-400 text-black border-yellow-500 font-bold' :
                    today ? 'border-green-400 text-green-200' :
                      'border-green-800 text-green-100'}
                    ${!inMonth ? 'opacity-30' : ''}
                    ${isHomeworkDay ? 'hover:bg-green-600 transition' : 'opacity-30 cursor-not-allowed'}`}
                >
                  {format(day, 'd')}
                </button>
              );
              day = addDays(day, 1);
            }

            return days;
          })()}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-10">
        <div className="bg-[#1f2e35] p-6 rounded-2xl border border-green-600 shadow-lg">
          <div className="flex items-center gap-4">
            <FaBookOpen className="text-4xl text-green-300" />
            <div>
              <h1 className="text-2xl font-bold text-green-100">{group.name}</h1>
              <p className="text-sm text-gray-400">{group.subject}</p>
            </div>
          </div>
        </div>

        {activeDate && (
          <div className="space-y-8">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveView('lesson')}
                className={`px-6 py-2 rounded-full font-semibold text-sm border transition ${
                  activeView === 'lesson'
                    ? 'bg-yellow-400 text-black border-yellow-500'
                    : 'bg-blue-800 text-white border-blue-500 hover:bg-blue-700'
                }`}
              >
                📘 Review Lesson
              </button>
              <button
                onClick={() => setActiveView('homework')}
                className={`px-6 py-2 rounded-full font-semibold text-sm border transition ${
                  activeView === 'homework'
                    ? 'bg-yellow-400 text-black border-yellow-500'
                    : 'bg-green-800 text-white border-green-500 hover:bg-green-700'
                }`}
              >
                📝 Complete Homework
              </button>
            </div>

            {activeView === 'lesson' && lessons[groupId]?.[activeDate] && (
              <div className="bg-[#1f2e35] p-6 rounded-xl border border-blue-500 shadow-md mb-6">
                <h2 className="text-xl font-bold text-blue-300 mb-2">
                  📘 {lessons[groupId][activeDate].title}
                </h2>
                <ul className="list-disc pl-6 text-blue-100 space-y-1 text-sm">
                  {lessons[groupId][activeDate].points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeView === 'homework' &&
              group.homeworksByDate[activeDate]?.map((hw) => (
                <div
                  key={hw.id}
                  className="bg-[#2a3a44] p-6 rounded-xl border border-green-400 shadow-xl"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">{hw.title}</h3>
                  {hw.type === 'code' ? (
                    <CodeMirror
                      value={answers[hw.id] || ''}
                      height="200px"
                      extensions={[python()]}
                      theme="dark"
                      onChange={(value) => handleChange(hw.id, value)}
                      className="rounded-xl border border-green-400"
                    />
                  ) : (
                    <textarea
                      rows={3}
                      placeholder="Write your answer..."
                      value={answers[hw.id] || ''}
                      onChange={(e) => handleChange(hw.id, e.target.value)}
                      className="w-full px-4 py-3 border border-green-400 rounded-lg text-white bg-[#1f2e35]"
                    />
                  )}
                  <button
                    onClick={() => handleSubmit(hw.id)}
                    className="mt-4 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                  >
                    Submit Answer
                  </button>

                  {results[hw.id] !== undefined && (
                    <div
                      className={`mt-4 flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-lg ${
                        results[hw.id]
                          ? 'bg-green-900 text-green-300'
                          : 'bg-red-900 text-red-300'
                      }`}
                    >
                      {results[hw.id] ? <FaCheckCircle /> : <FaTimesCircle />}
                      {results[hw.id] ? '✅ Correct' : '❌ Incorrect'}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentGroupPage;
