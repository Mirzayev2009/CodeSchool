import React, { useState } from 'react';
import { FaLock, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleLogin = () => {
    if (!userId || !password) return alert("Please enter both ID and password");

    if (userId.startsWith("T") && password === "teacher123") {
      navigate("/teacher-dashboard")
    } else if (userId.startsWith("S") && password === "student123") {
      navigate("/student-dashboard")
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center px-4">
      <div className="bg-[#1f2e35] text-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-green-400 transition-transform hover:scale-105">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <FaUserCircle className="text-5xl text-green-400 mb-3" />
          <h2 className="text-3xl font-extrabold text-green-100">Login to CodeSchool</h2>
          <p className="text-sm text-gray-300 mt-2">Continue your journey in coding, AI, and English</p>
        </div>

        {/* ID Input */}
        <div className="mb-5">
          <label className="block text-green-300 text-sm font-semibold mb-1">User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="e.g., T001 or S001"
            className="w-full px-4 py-3 rounded-lg border border-green-400 bg-[#2a3a44] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-green-300 text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-lg border border-green-400 bg-[#2a3a44] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-lg transition-all shadow-md"
        >
          <FaLock className="inline mr-2" /> Login
        </button>
      </div>
    </div>
  );
};

export default Login;




