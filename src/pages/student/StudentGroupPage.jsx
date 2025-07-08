import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

const groups = [
  { id: 'g1', name: 'AI Bootcamp', subject: 'Artificial Intelligence' },
  { id: 'g2', name: 'English Advanced', subject: 'English' },
  { id: 'g3', name: 'Frontend Pro', subject: 'Coding' },
];

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
  const [group, setGroup] = useState(null);
  const [answers, setAnswers] = useState({});
  const [activeDate, setActiveDate] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`homeworks-${groupId}`));
    const matchedGroup = groups.find((g) => g.id === groupId);
    if (saved && matchedGroup) {
      const filtered = filterHomeworksBySubject(saved, matchedGroup.subject);
      setGroup({ ...matchedGroup, homeworksByDate: filtered });
    }
  }, [groupId]);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (hwId) => {
    const studentAnswer = answers[hwId]?.trim().toLowerCase();
    const hwList = group.homeworksByDate?.[activeDate] || [];
    const hw = hwList.find((h) => h.id === hwId);

    if (!studentAnswer) {
      alert("Please write an answer.");
      return;
    }

    if (!hw) {
      alert("Homework not found.");
      return;
    }

    const correctAnswer = hw.answer?.trim().toLowerCase() || "";
    const isCorrect = studentAnswer === correctAnswer;

    alert(isCorrect ? "✅ It is true" : "❌ You need to study");

    // Optional: Save result
    const studentId = "student1"; // Replace with real student ID logic if needed
    const key =` answers-${groupId}-${activeDate}`;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-4">
      <div className="max-w-5xl mx-auto bg-[#1f2e35] rounded-3xl shadow-2xl p-6 border border-green-400">
        <div className="flex flex-col items-center mb-6">
          <FaBookOpen className="text-4xl text-green-300 mb-2 animate-pulse" />
          <h1 className="text-3xl font-bold text-green-100">{group.name}</h1>
          <p className="text-sm text-gray-300">{group.subject}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.keys(group.homeworksByDate).map((date) => (
            <button
              key={date}
              onClick={() => setActiveDate(date)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                activeDate === date
                  ? 'bg-green-700 text-white border-green-500'
                  : 'bg-[#2e3e47] text-green-100 border-green-300 hover:bg-green-600 hover:text-white'
              }`}
            >
              {date}
            </button>
          ))}
        </div>{activeDate && group.homeworksByDate[activeDate] && (
          <div className="space-y-6">
            {group.homeworksByDate[activeDate].map((hw) => (
              <div
                key={hw.id}
                className="bg-[#2a3a44] p-5 rounded-xl border border-green-300 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{hw.title}</h3>
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
                    className="w-full px-4 py-2 border border-green-400 rounded-lg text-white"
                  />
                )}

                <button
                  onClick={() => handleSubmit(hw.id)}
                  className="mt-3 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  Submit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentGroupPage;




