import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Users, DollarSign, BarChart3, Link as LinkIcon, Globe, LogOut, Calendar1 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'Registrations', href: '/admin/registrations', icon: Users },
  { name: 'Revenue', href: '/admin/revenue', icon: DollarSign },
  { name: 'Meeting Links', href: '/admin/meeting-links', icon: LinkIcon },
  { name: 'Workshops', href: '/admin/AdminAdd_dates', icon: Calendar1 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleVisitWebsite = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 shadow-lg border-r border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-xl font-bold text-white">Gangadhar Nagarjuna</h1>
          </div>
          
          {/* Visit Website Button */}
          <div className="p-4 border-b border-gray-700">
            <Button
              onClick={handleVisitWebsite}
              variant="outline"
              className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:text-white"
            >
              <Globe className="mr-2 h-4 w-4" />
              Visit Website
            </Button>
          </div>

          <nav className="px-4 space-y-2 flex-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sign Out Button */}
          <div className="p-4 border-t border-gray-700">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full bg-red-600 border-red-500 text-white hover:bg-red-700 hover:text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8 bg-gray-900">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
