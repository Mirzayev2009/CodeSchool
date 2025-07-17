// src/components/shared/Sidebar.jsx
import { NavLink } from 'react-router-dom';

const links = [
  { name: 'Bosh sahifa', href: '/teacher-dashboard' },
  { name: 'Guruhlar', href: '/teacher-dashboard/groups' },
  { name: 'Sozlamalar', href: '/teacher-dashboard/settings' },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r p-6 shadow-sm">
      <h2 className="text-xl font-bold text-green-600 mb-6">XCourse</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium transition hover:bg-green-100 ${
                isActive ? 'bg-green-200 text-green-800 font-bold' : 'text-gray-700'
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
