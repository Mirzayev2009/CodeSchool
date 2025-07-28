import React from 'react';
import { LogOut, Sun, Moon, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Topbar = ({ name = 'Student' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔐 Add logout logic here
    alert('Logging out...');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1f2e35] border-b border-green-500 px-6 py-3 flex items-center justify-between shadow-sm">
      <h1 className="text-lg font-bold text-green-400">🎓 Student Dashboard</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:inline">👋 {name}</span>

        {/* Toggle Theme (fake here, just for UI) */}
        <Button size="icon" variant="ghost" title="Toggle theme">
          <Sun className="h-4 w-4 text-yellow-400" />
        </Button>

        {/* Settings */}
        <Button
          size="icon"
          variant="ghost"
          title="Settings"
          onClick={() => navigate('/student-dashboard/settings')}
        >
          <Settings className="h-4 w-4 text-green-400" />
        </Button>

        {/* Profile (optional) */}
        <Button
          size="icon"
          variant="ghost"
          title="Profile"
          onClick={() => alert('Show profile page or dropdown')}
        >
          <User className="h-4 w-4 text-white" />
        </Button>

        {/* Logout */}
        <Button
          size="icon"
          variant="ghost"
          title="Log out"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 text-red-400" />
        </Button>
      </div>
    </header>
  );
};
