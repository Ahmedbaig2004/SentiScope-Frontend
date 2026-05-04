import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { 
  BarChart3, 
  ShieldCheck, 
  Shield,
  Zap, 
  MessageSquare, 
  ArrowRight,
  ChevronRight,
  Star
} from 'lucide-react';

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen app-bg-gradient">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(99,102,241,0.1)_0%,rgba(255,255,255,0)_100%)]" />
        <div className="w-full px-[5%] lg:px-[10%]">
          <div className="flex flex-col items-center text-center w-full">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 mb-10 animate-fade-in shadow-sm border border-violet-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              New: AI Sentiment Analysis 2.0 is here
            </div>
            
            <h1 className="text-5xl lg:text-8xl font-black tracking-tighter text-violet-950 mb-10 max-w-[90%] leading-[0.85] uppercase italic">
              Understand your audience with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-violet-800">precision.</span>
            </h1>
            
            <p className="text-lg lg:text-2xl text-violet-900 mb-12 max-w-4xl leading-relaxed font-bold opacity-80">
              SentiScope helps you gather feedback and analyze sentiments in real-time using advanced AI. Build better products with data-driven decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <Button size="lg" className="px-10 h-14 text-lg font-black uppercase tracking-widest shadow-xl shadow-violet-900/30 rounded-2xl" asChild>
                <Link to={user ? "/dashboard" : "/signup"}>
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-20">
        <div className="max-w-[90rem] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-violet-950 mb-4">Everything you need to grow</h2>
            <p className="text-violet-800 max-w-2xl mx-auto font-medium text-lg">
              Powerful features to help you collect insights and make data-driven decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart3 className="h-6 w-6" />}
              title="Real-time Analytics"
              description="Monitor responses as they come in with beautiful, easy-to-read charts and insights."
            />
            <FeatureCard 
              icon={<MessageSquare className="h-6 w-6" />}
              title="Smart Templates"
              description="Start in seconds with pre-built templates for any use case, from feedback to education."
            />
            <FeatureCard 
              icon={<Shield className="h-6 w-6" />}
              title="Secure & Private"
              description="Your data is encrypted and secure. We value privacy as much as you do."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-violet-100/90 via-violet-200/80 to-violet-300/70 border-t border-violet-400/20 py-12">
        <div className="max-w-[90rem] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <img src="/hero.png" alt="SentiScope Logo" className="h-6 w-6 object-contain brightness-0 invert" />
              </div>
              <span className="text-xl font-black text-violet-950 tracking-tighter uppercase italic">SentiScope</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs text-violet-800 font-black uppercase tracking-widest opacity-80">
              <Link to="/dashboard" className="hover:text-violet-950 transition-colors">Dashboard</Link>
              <Link to="/surveys" className="hover:text-violet-950 transition-colors">Surveys</Link>
              <Link to="/templates" className="hover:text-violet-950 transition-colors">Templates</Link>
              <Link to="/surveys/analytics" className="hover:text-violet-950 transition-colors">Analytics</Link>
            </div>
            <div className="text-[10px] text-violet-700 font-black uppercase tracking-[0.2em] opacity-60">
              © 2026 SentiScope Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gradient-to-br from-violet-100/90 via-violet-200/80 to-violet-300/70 backdrop-blur-xl p-8 rounded-3xl border border-violet-400/20 shadow-xl hover:shadow-2xl hover:border-violet-500 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all" />
      <div className="h-14 w-14 bg-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform shadow-lg shadow-violet-900/30">
        <div className="text-white">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-black text-violet-950 mb-3 tracking-tight">{title}</h3>
      <p className="text-violet-900 leading-relaxed font-bold opacity-80">{description}</p>
      <div className="mt-8 flex items-center text-violet-700 font-black text-xs uppercase tracking-widest cursor-pointer group/link">
        Learn more <ChevronRight className="ml-2 h-4 w-4 group-hover/link:translate-x-2 transition-transform" />
      </div>
    </div>
  );
}
