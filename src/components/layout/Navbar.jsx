import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { 
  Lock, 
  LayoutDashboard, 
  ClipboardList, 
  LayoutTemplate, 
  BarChart3,
  LogOut
} from 'lucide-react';

const navTabs = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'Surveys', to: '/surveys', icon: ClipboardList },
  { label: 'Templates', to: '/templates', icon: LayoutTemplate },
  { label: 'Analytics', to: '/analytics', icon: BarChart3 },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (e, tab) => {
    if (!user) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-violet-100/90 via-violet-200/80 to-violet-300/70 backdrop-blur-xl border-b border-violet-400/20 px-4 md:px-6 h-16 flex items-center justify-between shadow-xl">
      <div className="flex items-center gap-8">
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 group shrink-0">
          <img src="/hero.png" alt="SentiScope Logo" className="h-8 w-8 object-contain brightness-0 opacity-80 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-black text-violet-950 tracking-tighter uppercase italic">SentiScope</span>
        </Link>

        {/* Desktop Navigation Tabs */}
        <div className="hidden md:flex items-center gap-1">
          {navTabs.map((tab) => {
            const isActive = location.pathname === tab.to;
            return (
              <Link
                key={tab.to}
                to={tab.to}
                onClick={(e) => handleTabClick(e, tab)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300",
                  isActive 
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-900/20" 
                    : "text-violet-900 hover:text-violet-950 hover:bg-white/40",
                  !user && "cursor-not-allowed opacity-70"
                )}
              >
                <tab.icon className={cn("h-4 w-4", isActive ? "text-white" : "text-violet-700")} />
                {tab.label}
                {!user && (
                  <Lock className="h-3 w-3 text-violet-700 ml-1" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="px-4 py-2 bg-white/40 rounded-xl border border-white/20 flex items-center gap-2 hover:bg-white/60 transition-all group">
              <div className="h-7 w-7 bg-violet-600 rounded-lg flex items-center justify-center text-[10px] font-black text-white shadow-md group-hover:scale-110 transition-transform">
                 {user.name?.substring(0, 2) || 'US'}
              </div>
              <span className="text-sm font-black text-violet-950 tracking-tight hidden xs:inline">
                Dashboard
              </span>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-violet-900 font-bold hover:text-red-700 hover:bg-red-50/50 h-10 w-10 sm:w-auto p-0 sm:px-3"
            >
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden xs:flex text-violet-900 font-bold hover:bg-white/40 h-10">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button size="sm" className="rounded-xl px-4 sm:px-6 h-10 bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-900/30 border-none font-black uppercase tracking-widest text-[10px] sm:text-xs" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
