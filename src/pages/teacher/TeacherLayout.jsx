// src/pages/teacher/TeacherLayout.jsx
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Bosh sahifa', href: '/teacher-dashboard' },
  { name: 'Guruhlar', href: '/teacher-dashboard/groups' },
  { name: 'Sozlamalar', href: '/teacher-dashboard/settings' },
];

const Sidebar = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 left-0 w-64 h-full bg-[#0f2027] border-r border-green-700 z-50 p-6 flex flex-col"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-green-500">XCourse</h2>
          <X className="text-white cursor-pointer" onClick={onClose} />
        </div>
        <nav className="space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              onClick={onClose}
              className={({ isActive }) =>
                `block py-2 px-4 rounded-lg font-medium transition-all hover:bg-green-700/30 ${
                  isActive ? 'bg-green-600 text-white' : 'text-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </motion.aside>
    )}
  </AnimatePresence>
);

const TeacherLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r border-green-700 p-6 bg-[#0f2027]">
        <h2 className="text-xl font-bold text-green-500 mb-6">XCourse</h2>
        <nav className="space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `block py-2 px-4 rounded-lg font-medium transition-all hover:bg-green-700/30 ${
                  isActive ? 'bg-green-600 text-white' : 'text-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Menu onClick={() => setSidebarOpen(true)} className="text-white w-8 h-8 cursor-pointer" />
      </div>

      {/* Mobile Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-x-hidden w-full">
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default TeacherLayout;