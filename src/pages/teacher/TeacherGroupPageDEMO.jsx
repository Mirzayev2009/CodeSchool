import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUsersCog } from 'react-icons/fa';

const TeacherGroupPageDEMO = () => {
  const { groupId } = useParams();
  const today = new Date().toISOString().split('T')[0];

  const [group, setGroup] = useState(null);
  const [homeworkBank, setHomeworkBank] = useState({});
  const [attendance, setAttendance] = useState({});
  const [homeworks, setHomeworks] = useState({});
  const selectedDate = today;

  const getHomeworkKey = (id) => `homeworks-${id}`;

  // Fetch group + homeworks
  useEffect(() => {
    fetch('/data/groups.json')
      .then((res) => res.json())
      .then((groups) => {
        const found = groups.find((g) => g.id === groupId);
        setGroup(found || null);
      });

    fetch('/data/homeworks.json')
      .then((res) => res.json())
      .then(setHomeworkBank);
  }, [groupId]);

  // Load saved homeworks
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(getHomeworkKey(groupId)));
    if (saved) setHomeworks(saved);
  }, [groupId]);

  // Save homeworks when changed
  useEffect(() => {
    localStorage.setItem(getHomeworkKey(groupId), JSON.stringify(homeworks));
  }, [homeworks, groupId]);

  const toggleAttendance = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [selectedDate]: {
        ...(prev[selectedDate] || {}),
        [studentId]: !((prev[selectedDate] || {})[studentId]),
      },
    }));
  };

  const handleHomeworkToggle = (hw) => {
    setHomeworks((prev) => {
      const current = prev[selectedDate] || [];
      const exists = current.some((item) => item.id === hw.id);
      const updated = exists
        ? current.filter((item) => item.id !== hw.id)
        : [...current, { ...hw, subject: group.subject }];
      return {
        ...prev,
        [selectedDate]: updated,
      };
    });
  };

  const handleRemoveAssigned = (hwId) => {
    setHomeworks((prev) => ({
      ...prev,
      [selectedDate]: prev[selectedDate].filter((hw) => hw.id !== hwId),
    }));
  };

  if (!group) {
    return <div className="text-center p-10 text-red-600 font-bold">Group not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-4">
      <div className="max-w-5xl mx-auto bg-[#1f2e35] rounded-3xl p-6 shadow-2xl border border-green-400">
        <div className="flex flex-col items-center mb-6">
          <FaUsersCog className="text-4xl text-green-300 mb-2 animate-pulse" />
          <h1 className="text-3xl font-bold text-green-100">{group.name}</h1>
          <p className="text-sm text-gray-300">Fan: {group.subject}</p>
          <p className="text-sm text-green-200 mt-1">📅 Sana: {selectedDate}</p>
        </div>

        <h3 className="text-xl font-bold mb-3 text-green-100">✅ Davomat</h3>
        <div className="space-y-3 mb-10">
          {group.students.map((student) => {
            const isPresent = attendance[selectedDate]?.[student.id] || false;
            return (
              <div
                key={student.id}
                className="flex items-center justify-between bg-[#2a3a44] px-4 py-2 rounded-xl border border-green-300"
              >
                <span className="text-white font-medium">{student.name}</span>
                <button
                  onClick={() => toggleAttendance(student.id)}
                  className={`px-4 py-1 text-sm font-semibold rounded-full ${
                    isPresent ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-800'
                  }`}
                >
                  {isPresent ? 'Borda' : 'Yo‘q'}
                </button>
              </div>
            );
          })}
        </div>

        <h3 className="text-xl font-bold mb-3 text-green-100">📚 Uyga vazifa</h3>
        {homeworkBank[selectedDate]?.length > 0 ? (
          <div className="space-y-3 mb-6">
            {homeworkBank[selectedDate].map((hw) => {
              const isChecked = homeworks[selectedDate]?.some((h) => h.id === hw.id);
              return (
                <div
                  key={hw.id}
                  className="flex items-center justify-between bg-[#2a3a44] px-4 py-2 rounded-xl border border-green-300"
                >
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleHomeworkToggle(hw)}
                      className="w-5 h-5 text-green-500"
                    />
                    <span className="text-white">{hw.title}</span>
                  </label>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400">📭 Bugun uchun vazifalar mavjud emas.</p>
        )}

        {homeworks[selectedDate]?.length > 0 && (
          <div className="mt-6">
            <h4 className="text-green-200 font-semibold mb-2">✅ Belgilangan vazifalar:</h4>
            <ul className="list-disc list-inside text-white space-y-1">
              {homeworks[selectedDate].map((hw) => (
                <li key={hw.id} className="flex justify-between items-center">
                  <span>{hw.title}</span>
                  <button
                    onClick={() => handleRemoveAssigned(hw.id)}
                    className="text-sm text-red-400 hover:underline"
                  >
                    ❌ O‘chirish
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherGroupPageDEMO;





