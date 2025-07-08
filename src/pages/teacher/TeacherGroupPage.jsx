import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUsersCog } from 'react-icons/fa';

const groupMock = {
  id: 'g1',
  name: 'AI Bootcamp (Morning)',
  subject: 'Artificial Intelligence',
  students: [
    { id: 's1', name: 'Jasur Ismoilov' },
    { id: 's2', name: 'Nilufar Ergasheva' },
  ],
  dates: ['2025-07-07', '2025-07-08', '2025-07-09'],
};

const mockAvailableHomeworks = {
  '2025-07-07': [
    { id: 'hw1', title: 'Explain Overfitting', answer: 'Overfitting is when a model memorizes the training data', type: "text" },
    { id: 'hw2', title: 'What is Supervised Learning?', answer: 'Training a model using labeled data', type: "text" },
    { id: 'hw3', title: 'write python code', answer: '', type: "code" },

  ],
  '2025-07-08': [
    { id: 'hw3', title: 'Name 3 types of Neural Networks', answer: 'CNN, RNN, MLP' },
    { id: 'hw4', title: 'Define Accuracy and Precision', answer: 'Accuracy is total correct predictions; Precision is correct positive predictions' },
  ],
};


const TeacherGroupPage = () => {
  const { groupId } = useParams();
  const group = groupMock;

  const [selectedDate, setSelectedDate] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [homeworks, setHomeworks] = useState({});

  const getHomeworkKey = (id) => `homeworks-${id}`;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(getHomeworkKey(groupId)));
    if (saved) setHomeworks(saved);
  }, [groupId]);

  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem(getHomeworkKey(groupId), JSON.stringify(homeworks));
    }
  }, [homeworks, groupId, selectedDate]);

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
    return (
      <div className="text-center p-10 text-red-600 font-bold">
        Group not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-4">
      <div className="max-w-5xl mx-auto bg-[#1f2e35] rounded-3xl p-6 shadow-2xl border border-green-400">
        <div className="flex flex-col items-center mb-6">
          <FaUsersCog className="text-4xl text-green-300 mb-2 animate-pulse" />
          <h1 className="text-3xl font-bold text-green-100">{group.name}</h1>
          <p className="text-sm text-gray-300">Subject: {group.subject}</p>
        </div>

        {/* Dates */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {group.dates.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-4 py-2 rounded-full border text-sm transition-all font-medium ${
                selectedDate === date
                  ? 'bg-green-700 text-white border-green-500'
                  : 'bg-[#2e3e47] text-green-100 border-green-300 hover:bg-green-600 hover:text-white'
              }`}
            >
              {date}
            </button>
          ))}
        </div>

        {/* Attendance and Homework */}
        {selectedDate && (
          <>
            <h3 className="text-xl font-bold mb-3 text-green-100">✅ Attendance — {selectedDate}</h3>
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
                        isPresent
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-800'
                      }`}
                    >
                      {isPresent ? 'Present' : 'Absent'}
                    </button>
                  </div>
                );
              })}
            </div>

            <h3 className="text-xl font-bold mb-3 text-green-100">📚 Assign Homework</h3>
            {mockAvailableHomeworks[selectedDate]?.length > 0 ? (
              <div className="space-y-3 mb-6">
                {mockAvailableHomeworks[selectedDate].map((hw) => {
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
              <p className="text-gray-400">No homeworks available for this date.</p>
            )}

            {homeworks[selectedDate]?.length > 0 && (
              <div className="mt-6">
                <h4 className="text-green-200 font-semibold mb-2">✅ Assigned:</h4>
                <ul className="list-disc list-inside text-white space-y-1">
                  {homeworks[selectedDate].map((hw) => (
                    <li key={hw.id} className="flex justify-between items-center">
                      <span>{hw.title}</span>
                      <button
                        onClick={() => handleRemoveAssigned(hw.id)}
                        className="text-sm text-red-400 hover:underline"
                      >
                        ❌ Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherGroupPage;






