import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  BellIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

function Sidebar({ isOpen }) {
  const location = useLocation();
  
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <HomeIcon className="w-6 h-6" />,
      path: '/dashboard'
    },
    {
      title: 'Incidents',
      icon: <ClipboardDocumentListIcon className="w-6 h-6" />,
      path: '/dashboard/incidents'
    },
    {
      title: 'Notifications',
      icon: <BellIcon className="w-6 h-6" />,
      path: '/dashboard/notifications'
    },
    {
      title: 'Analytics',
      icon: <ChartBarIcon className="w-6 h-6" />,
      path: '/dashboard/analytics'
    },
    {
      title: 'Settings',
      icon: <Cog6ToothIcon className="w-6 h-6" />,
      path: '/dashboard/settings'
    }
  ];

  return (
    <aside className={`
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
      fixed lg:relative
      inset-y-0 left-0
      w-64
      bg-white
      border-r
      shadow-lg lg:shadow-none
      transform
      transition-transform
      duration-300
      ease-in-out
      z-30
    `}>
      <div className="h-20 flex items-center justify-center border-b">
        <h2 className="text-xl font-bold text-orange-500">NGO Dashboard</h2>
      </div>

      <nav className="mt-6">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.title}
                to={item.path}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${isActive 
                    ? 'bg-orange-50 text-orange-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                {item.icon}
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;