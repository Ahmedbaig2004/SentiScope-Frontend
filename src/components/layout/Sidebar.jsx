import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  LayoutTemplate,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Home
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/surveys', label: 'Surveys', icon: ClipboardList },
  { to: '/templates', label: 'Templates', icon: LayoutTemplate },
  { to: '/surveys/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();
    
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 bottom-0 w-64 bg-gradient-to-b from-violet-100/95 via-violet-200/90 to-violet-300/80 backdrop-blur-xl border-r border-violet-400/20 z-[55] flex flex-col transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-violet-400/20">
        <div className="flex items-center gap-2">
          <img src="/hero.png" alt="SentiScope Logo" className="h-8 w-8 object-contain brightness-0 opacity-80" />
          <span className="text-xl font-black text-violet-950 tracking-tighter uppercase italic">SentiScope</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="lg:flex hidden hover:bg-white/30 text-violet-900"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Links */}
      <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
        <div>
          <h3 className="px-4 text-[10px] font-black text-violet-800 uppercase tracking-[0.2em] mb-4 opacity-70">
            Main Menu
          </h3>
          <nav className="space-y-1.5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/surveys'}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300",
                    isActive
                      ? "bg-violet-600 text-white shadow-xl shadow-violet-900/40 translate-x-1"
                      : "text-violet-900 hover:bg-white/40 hover:translate-x-1"
                  )
                }
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="px-4 text-[10px] font-black text-violet-800 uppercase tracking-[0.2em] mb-4 opacity-70">
            Support
          </h3>
          <nav className="space-y-1.5">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-violet-900 hover:bg-white/40 hover:translate-x-1 transition-all">
              <Settings className="h-5 w-5" />
              Settings
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-violet-900 hover:bg-white/40 hover:translate-x-1 transition-all">
              <HelpCircle className="h-5 w-5" />
              Help Center
            </button>
          </nav>
        </div>
      </div>

      {/* Sidebar Footer (User Info & Logout) */}
      <div className="p-4 border-t border-violet-400/20 bg-white/20">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="h-10 w-10 bg-violet-600 rounded-2xl flex items-center justify-center text-xs font-black text-white shadow-lg shadow-violet-900/30">
            {user?.name?.substring(0, 2).toUpperCase() || 'US'}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-black text-violet-950 truncate tracking-tight">{user?.name}</p>
            <p className="text-[10px] font-bold text-violet-800/70 truncate uppercase tracking-wider">{user?.email}</p>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start text-violet-900 font-bold hover:text-red-700 hover:bg-red-50/50 rounded-xl gap-3 px-4"
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
