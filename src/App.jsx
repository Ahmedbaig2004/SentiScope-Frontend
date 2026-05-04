import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import SurveyList from './pages/SurveyList';
import SurveyEditor from './pages/SurveyEditor';
import TemplateGallery from './pages/TemplateGallery';
import SurveyAnalytics from './pages/SurveyAnalytics';
import PublicSurvey from './pages/PublicSurvey';

// Layout for public pages that should have the Navbar
function PublicLayout() {
  return (
    <div className="pt-16">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes with Navbar */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Public route without Navbar (e.g. taking a survey) */}
          <Route path="/survey/:id" element={<PublicSurvey />} />

          {/* Protected routes with Sidebar layout (No Navbar) */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/surveys" element={<SurveyList />} />
            <Route path="/surveys/analytics" element={<SurveyList />} />
            <Route path="/surveys/:id/edit" element={<SurveyEditor />} />
            <Route path="/surveys/:id/analytics" element={<SurveyAnalytics />} />
            <Route path="/templates" element={<TemplateGallery />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
