import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.errors?.[0] || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center app-bg-gradient px-4 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-violet-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-md relative z-10">
        <Link to={user ? "/dashboard" : "/"} className="block text-center mb-10 group transition-all">
          <div className="flex items-center justify-center gap-3 mb-4">
             <img src="/hero.png" alt="SentiScope Logo" className="h-10 w-10 object-contain brightness-0 opacity-80 group-hover:scale-110 transition-transform" />
             <h1 className="text-4xl font-black text-violet-950 tracking-tighter uppercase italic">SentiScope</h1>
          </div>
          <p className="text-xs font-black text-violet-800 uppercase tracking-[0.3em] opacity-60">Insight-Driven Analytics</p>
        </Link>

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-violet-100/90 via-violet-200/80 to-violet-300/70 backdrop-blur-2xl p-10 rounded-[40px] shadow-2xl border border-violet-400/20 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-black uppercase tracking-widest p-4 rounded-2xl animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-violet-900 mb-2 uppercase tracking-widest opacity-60">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white/40 border border-violet-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-violet-950 font-bold placeholder:text-violet-300 shadow-inner transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-violet-900 mb-2 uppercase tracking-widest opacity-60">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white/40 border border-violet-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-violet-950 font-bold placeholder:text-violet-300 shadow-inner transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-violet-900 mb-2 uppercase tracking-widest opacity-60">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-5 py-4 bg-white/40 border border-violet-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-violet-950 font-bold placeholder:text-violet-300 shadow-inner transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 text-white py-4 px-6 rounded-2xl hover:bg-violet-700 disabled:opacity-50 cursor-pointer font-black uppercase tracking-[0.2em] shadow-xl shadow-violet-900/30 border-none transition-all hover:-translate-y-1 active:scale-95"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="text-center text-xs font-black text-violet-800 uppercase tracking-widest opacity-70">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-600 hover:text-violet-950 transition-colors underline decoration-2 underline-offset-4">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
