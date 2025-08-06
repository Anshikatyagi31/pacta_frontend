import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import UsersPage from './pages/UsersPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import UserProfilePage from './pages/UserProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';
import AuthChecker from './components/common/AuthChecker';
import ErrorBoundary from './components/common/ErrorBoundary';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <AuthChecker>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:id" element={<ProjectDetailPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/users/:username" element={<UserProfilePage />} />
                  
                  {/* Protected Routes */}
                  <Route path="/create-project" element={
                    <ProtectedRoute>
                      <CreateProjectPage />
                    </ProtectedRoute>
                  } />
                  
                  {/* Public Routes (redirect if authenticated) */}
                  <Route path="/login" element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  } />
                  <Route path="/signup" element={
                    <PublicRoute>
                      <SignupPage />
                    </PublicRoute>
                  } />
                  
                  {/* 404 Page */}
                  <Route path="*" element={
                    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                        <p className="text-gray-600 mb-6">Page not found</p>
                        <a href="/" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors">
                          Go Home
                        </a>
                      </div>
                    </div>
                  } />
                </Routes>
              </main>
            </div>
          </AuthChecker>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
