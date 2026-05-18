import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Sparkles,
  TrendingUp,
  Settings,
} from 'lucide-react';

export const Sidebar = () => {
  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Employees',
      path: '/employees',
      icon: <Users size={20} />,
    },
    {
      label: 'Analytics',
      path: '/analytics',
      icon: <BarChart3 size={20} />,
    },
    {
      label: 'AI Recommendations',
      path: '/ai-recommendations',
      icon: <Sparkles size={20} />,
    },
    {
      label: 'Rankings',
      path: '/rankings',
      icon: <TrendingUp size={20} />,
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-gray-900 text-white">
      <div className="p-6">
        <h2 className="text-xl font-bold">Menu</h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <p className="text-xs text-gray-400">© 2024 Employee AI System</p>
      </div>
    </aside>
  );
};

export default Sidebar;
