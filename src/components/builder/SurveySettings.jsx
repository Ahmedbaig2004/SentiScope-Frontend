export default function SurveySettings({ settings, onChange }) {
  const update = (field, value) => {
    onChange({ ...settings, [field]: value });
  };

  return (
    <div className="bg-gradient-to-br from-violet-100/90 via-violet-200/80 to-violet-300/70 backdrop-blur-xl border border-violet-400/20 rounded-3xl p-6 space-y-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
      <h3 className="text-xs font-black text-violet-950 uppercase tracking-[0.3em] opacity-80 border-b border-violet-200 pb-3">Survey Configuration</h3>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-violet-800 block mb-2 uppercase tracking-widest opacity-60">Welcome Message</label>
          <textarea
            value={settings.welcomeMessage || ''}
            onChange={(e) => update('welcomeMessage', e.target.value)}
            placeholder="Optional message shown at the start..."
            rows={2}
            className="w-full px-4 py-3 bg-white/40 border border-violet-200 rounded-2xl text-sm font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none transition-all placeholder:text-violet-300 shadow-inner"
          />
        </div>

        <div>
          <label className="text-[10px] font-black text-violet-800 block mb-2 uppercase tracking-widest opacity-60">Ending Message</label>
          <textarea
            value={settings.endingMessage || 'Thank you for your response!'}
            onChange={(e) => update('endingMessage', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 bg-white/40 border border-violet-200 rounded-2xl text-sm font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none transition-all placeholder:text-violet-300 shadow-inner"
          />
        </div>

        <label className="flex items-center gap-3 text-xs font-black text-violet-900 cursor-pointer uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity pt-2">
          <input
            type="checkbox"
            checked={settings.showProgressBar ?? true}
            onChange={(e) => update('showProgressBar', e.target.checked)}
            className="w-4 h-4 rounded border-2 border-violet-300 text-violet-600 focus:ring-violet-500 bg-white/50 cursor-pointer"
          />
          Show progress bar to respondents
        </label>
      </div>
    </div>
  );
}
