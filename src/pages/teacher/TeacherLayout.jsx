import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

const TeacherLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-shrink-0 border-r border-[#1a2e3a] bg-[#1f2e35] shadow-lg">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-[#0f2027] border-b border-[#1a2e3a]">
          <h1 className="text-white font-bold text-xl">XCourse</h1>
          <button onClick={() => setShowSidebar(true)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setShowSidebar(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
              />

              {/* Sidebar panel */}
              <motion.div
                className="fixed top-0 left-0 z-50 h-full w-64 bg-[#1f2e35] shadow-xl p-6"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <Sidebar onClose={() => setShowSidebar(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeacherLayout;
