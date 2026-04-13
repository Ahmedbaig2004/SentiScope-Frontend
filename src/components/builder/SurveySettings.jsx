export default function SurveySettings({ settings, onChange }) {
  const update = (field, value) => {
    onChange({ ...settings, [field]: value });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
      <h3 className="font-medium text-gray-900 text-sm">Survey Settings</h3>

      <div>
        <label className="text-xs text-gray-500 block mb-1">Welcome Message</label>
        <textarea
          value={settings.welcomeMessage || ''}
          onChange={(e) => update('welcomeMessage', e.target.value)}
          placeholder="Optional message shown at the start..."
          rows={2}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
        />
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">Ending Message</label>
        <textarea
          value={settings.endingMessage || 'Thank you for your response!'}
          onChange={(e) => update('endingMessage', e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <input
          type="checkbox"
          checked={settings.showProgressBar ?? true}
          onChange={(e) => update('showProgressBar', e.target.checked)}
          className="rounded border-gray-300"
        />
        Show progress bar
      </label>
    </div>
  );
}
