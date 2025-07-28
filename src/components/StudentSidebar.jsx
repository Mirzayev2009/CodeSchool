import { NavLink } from 'react-router-dom';
import { GraduationCap, CalendarDays, Settings, Home } from 'lucide-react';

const links = [
  { name: 'Bosh sahifa', href: '/student-dashboard', icon: <Home className="w-4 h-4" /> },
  { name: 'Guruhlar', href: '/student-dashboard/groups', icon: <GraduationCap className="w-4 h-4" /> },
  { name: 'Davomat', href: '/student-dashboard/attendance', icon: <CalendarDays className="w-4 h-4" /> },
  { name: 'Sozlamalar', href: '/student-dashboard/settings', icon: <Settings className="w-4 h-4" /> },
];

export const StudentSidebar = ({ onClose }) => {
  return (
    <aside className="w-64 min-h-screen bg-[#1f2e35] border-r border-green-500 p-6 shadow-md flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-green-400">🎓 XCourse</h2>
        {onClose && <button onClick={onClose} className="text-white md:hidden text-lg">✖</button>}
      </div>

      <nav className="space-y-2">
        {links.map(({ name, href, icon }) => (
          <NavLink
            key={href}
            to={href}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all
               ${isActive ? 'bg-green-200 text-green-900 font-semibold' : 'text-gray-300 hover:bg-green-100 hover:text-green-800'}`
            }
          >
            {icon} {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
