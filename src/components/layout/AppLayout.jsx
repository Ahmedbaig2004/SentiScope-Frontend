import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen relative overflow-hidden app-bg-gradient">
      {/* Mobile/Tablet Menu Toggle Button */}
      <div className="fixed top-3 left-3 z-[100] lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-violet-600 text-white shadow-xl shadow-violet-900/40 border-none rounded-2xl h-12 w-12 hover:bg-violet-700 active:scale-90 transition-all"
        >
          {isSidebarOpen ? <X className="h-6 w-6" strokeWidth={3} /> : <Menu className="h-6 w-6" strokeWidth={3} />}
        </Button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-500 ease-in-out min-w-0",
        isSidebarOpen ? "lg:pl-64" : "pl-0"
      )}>
        <div className="p-4 pt-20 md:pt-8 md:p-8 lg:p-10 relative min-h-screen">
          {/* Back to Home Button (Logo) */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-3 group transition-all">
              <div className="h-10 w-10 bg-white/40 backdrop-blur-md rounded-xl shadow-lg border border-white/20 flex items-center justify-center group-hover:scale-110 transition-all">
                <img src="/hero.png" alt="Home" className="h-6 w-6 object-contain brightness-0 opacity-80" />
              </div>
              <div>
                <span className="block text-[10px] font-black text-violet-800 uppercase tracking-[0.2em] leading-none mb-1 opacity-60">Back to</span>
                <span className="block text-sm font-black text-violet-950 group-hover:text-violet-700 transition-colors tracking-tight italic">Home</span>
              </div>
            </Link>
          </div>
          
          <div className="w-full max-w-full overflow-hidden lg:overflow-visible">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
