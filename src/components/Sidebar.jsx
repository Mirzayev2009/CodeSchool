import { NavLink } from 'react-router-dom';

const links = [
  { name: 'Bosh sahifa', href: '/teacher-dashboard' },
  { name: 'Guruhlar', href: '/teacher-dashboard/groups' },
  { name: 'Sozlamalar', href: '/teacher-dashboard/settings' },
];

const Sidebar = ({ onClose }) => {
  return (
    <aside className="flex flex-col w-64 h-full border-r p-6 bg-[#1f2e35] shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-green-500">XCourse</h2>
        {onClose && (
          <button onClick={onClose} className="text-white text-xl md:hidden">❌</button>
        )}
      </div>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            onClick={onClose}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium transition hover:bg-green-100 ${
                isActive ? 'bg-green-200 text-green-800 font-bold' : 'text-gray-300'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

