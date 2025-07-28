import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaCheckCircle,
  FaUserCheck,
  FaBookOpen,
  FaRegLightbulb,
  FaCalendarAlt,
  FaUsers,
  FaChalkboardTeacher,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#34d399', '#f87171'];

const TeacherGroupPageDEMO = () => {
  const { groupId } = useParams();
  const today = new Date().toISOString().split('T')[0];

  const [group, setGroup] = useState(null);
  const [lessonHeadline, setLessonHeadline] = useState('');
  const [lessonGoals, setLessonGoals] = useState([]);
  const [homeworkBank, setHomeworkBank] = useState({});
  const [attendance, setAttendance] = useState({});
  const [homeworks, setHomeworks] = useState({});
  const [showAttendance, setShowAttendance] = useState(false);

  const selectedDate = today;
  const getHomeworkKey = (id) => `homeworks-${id}`;
  const getAttendanceKey = (id) => `attendance-${id}`;

  useEffect(() => {
    fetch('/data/groups.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(g => g.id === groupId);
        setGroup(found || null);
      });

    fetch('/data/homeworks.json')
      .then(res => res.json())
      .then(setHomeworkBank);

    const saved = JSON.parse(localStorage.getItem(getHomeworkKey(groupId)));
    if (saved) setHomeworks(saved);

    const attendanceSaved = JSON.parse(localStorage.getItem(getAttendanceKey(groupId)));
    if (attendanceSaved) setAttendance(attendanceSaved);
  }, [groupId]);

  useEffect(() => {
    fetch('/data/lessonPlans.json')
      .then(res => res.json())
      .then(data => {
        const lesson = data[groupId]?.[selectedDate];
        if (lesson) {
          setLessonHeadline(lesson.title);
          setLessonGoals(lesson.points);
        }
      });
  }, [groupId, selectedDate]);

  useEffect(() => {
    localStorage.setItem(getHomeworkKey(groupId), JSON.stringify(homeworks));
  }, [homeworks, groupId]);

  useEffect(() => {
    localStorage.setItem(getAttendanceKey(groupId), JSON.stringify(attendance));
  }, [attendance, groupId]);

  const toggleAttendance = (studentId) => {
    setAttendance(prev => {
      const updated = {
        ...prev,
        [selectedDate]: {
          ...(prev[selectedDate] || {}),
          [studentId]: !((prev[selectedDate] || {})[studentId])
        }
      };
      localStorage.setItem(getAttendanceKey(groupId), JSON.stringify(updated));
      return updated;
    });
  };

  const handleHomeworkToggle = (hw) => {
    setHomeworks(prev => {
      const current = prev[selectedDate] || [];
      const exists = current.some(item => item.id === hw.id);
      const updated = exists
        ? current.filter(item => item.id !== hw.id)
        : [...current, { ...hw, subject: group.subject }];
      return {
        ...prev,
        [selectedDate]: updated
      };
    });
  };

  const handleRemoveAssigned = (hwId) => {
    setHomeworks(prev => ({
      ...prev,
      [selectedDate]: prev[selectedDate].filter(hw => hw.id !== hwId)
    }));
  };

  const presentCount = Object.values(attendance[selectedDate] || {}).filter(Boolean).length;
  const absentCount = group ? group.students.length - presentCount : 0;

  if (!group) {
    return <div className="text-center text-red-500 py-10 font-bold">Group not found</div>;
  }
 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-[#0b161b] via-[#203a43] to-[#315c6f] text-white px-4 py-8"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-[#1f2e35] px-6 py-4 rounded-xl border border-green-400 shadow-lg flex justify-between items-center transition-all duration-300 hover:scale-[1.01]">
          <div>
            <h2 className="text-2xl font-bold text-green-300 flex items-center gap-2">
              <FaChalkboardTeacher /> {group.name}
            </h2>
            <p className="text-sm text-gray-400">Fan: {group.subject}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-200 flex items-center gap-2">
              <FaCalendarAlt /> {selectedDate}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Plan Card */}
            <Card className="bg-[#2c3e50] border border-yellow-400 shadow-md hover:shadow-yellow-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-yellow-300 flex items-center gap-2">
                  <FaRegLightbulb /> Bugungi Dars Rejasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold text-white mb-2">{lessonHeadline || '—'}</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {lessonGoals.length > 0 ? (
                    lessonGoals.map((goal, i) => (
                      <li key={i}>{goal}</li>
                    ))
                  ) : (
                    <p className="text-gray-400">Reja topilmadi.</p>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Homework Section */}
            <Card className="bg-[#273746] border border-blue-400 shadow-md hover:shadow-blue-400/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-blue-200 flex items-center gap-2">
                  <FaBookOpen /> Uyga Vazifa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {homeworkBank[selectedDate]?.length ? (
                  homeworkBank[selectedDate].map(hw => {
                    const checked = homeworks[selectedDate]?.some(h => h.id === hw.id);
                    return (
                      <div key={hw.id} className="flex justify-between bg-[#34495e] px-4 py-2 rounded-xl hover:bg-[#3f5870] transition">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={checked} onChange={() => handleHomeworkToggle(hw)} />
                          <span className='text-white'>{hw.title}</span>
                        </label>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400">Bugun uchun vazifalar mavjud emas.</p>
                )}

                {homeworks[selectedDate]?.length > 0 && (
                  <div className="pt-4">
                    <h4 className="text-green-300 font-semibold">✅ Belgilangan:</h4>
                    <ul className="text-sm list-disc list-inside space-y-1 ">
                      {homeworks[selectedDate].map(hw => (
                     <div className='border  border-blue-400 rounded-sm p-1.5 '>
                         <li key={hw.id} className="flex justify-between items-center text-white">
                          {hw.title}
                          <button
                            onClick={() => handleRemoveAssigned(hw.id)}
                            className="text-red-400 hover:underline hover:text-red-300 transition"
                          >
                            O‘chirish
                          </button>
                        </li>
                     </div>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Attendance */}
            <Card className="bg-[#212f3d] border border-green-300 shadow hover:shadow-green-500/20 transition-all duration-300">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-lg text-green-200 flex items-center gap-2">
                  <FaUserCheck /> Davomat
                </CardTitle>
                <Button onClick={() => setShowAttendance(prev => !prev)} className="bg-green-600 hover:bg-green-700 transition">
                  {showAttendance ? 'Yopish' : 'Belgilang'}
                </Button>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  {showAttendance && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-2"
                    >
                      {group.students.map(student => {
                        const isPresent = attendance[selectedDate]?.[student.id] || false;
                        return (
                          <div key={student.id} className="flex justify-between bg-[#2c3e50] px-4 py-2 rounded-xl hover:bg-[#3b556d] transition">
                            <span className='text-white'>{student.name}</span>
                            <Button
                              onClick={() => toggleAttendance(student.id)}
                              className={isPresent ? 'bg-green-600' : 'bg-gray-400 text-black'}
                            >
                              {isPresent ? 'Bor' : 'Yo‘q'}
                            </Button>
                          </div>
                        );
                      })}
                      <Button onClick={() => setShowAttendance(false)} className="w-full mt-3 bg-green-700 hover:bg-green-800 transition">
                        Saqlash
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <Card className="bg-[#1c2833] border border-gray-500 shadow hover:shadow-white/10 transition">
              <CardHeader>
                <CardTitle className="text-sm text-gray-200 flex gap-2 items-center">
                  <FaUsers /> Statistika
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-300 space-y-2">
                <p>👥 Umumiy talabalar: {group.students.length}</p>
                <p>📖 Dars mavzusi: {lessonHeadline || '—'}</p>
                <p>✅ Davomat: {presentCount} / {group.students.length}</p>
                <p>📅 Sana: {selectedDate}</p>
                <div className="pt-3">
                  <PieChart width={160} height={160}>
                    <Pie dataKey="value" cx="50%" cy="50%" outerRadius={60} label data={[
                      { name: 'Darsda bor', value: presentCount },
                      { name: 'Yo‘q', value: absentCount },
                    ]}>
                      <Cell fill="#34d399" />
                      <Cell fill="#f87171" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeacherGroupPageDEMO;
