import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import TemplateCard from '../components/templates/TemplateCard';
import TemplatePreview from '../components/templates/TemplatePreview';

export default function TemplateGallery() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/templates')
      .then((res) => setTemplates(res.data.templates))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleUse = async (templateId) => {
    try {
      const res = await api.post(`/templates/${templateId}/clone`);
      navigate(`/surveys/${res.data.survey._id}/edit`);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to use template');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
        <p className="text-gray-500 mt-1">Choose a pre-built template to get started quickly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.map((t) => (
          <TemplateCard
            key={t._id}
            template={t}
            onPreview={(tpl) => setPreview(tpl)}
            onUse={handleUse}
          />
        ))}
      </div>

      <TemplatePreview
        template={preview}
        onClose={() => setPreview(null)}
        onUse={(id) => { setPreview(null); handleUse(id); }}
      />
    </div>
  );
}
