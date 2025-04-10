import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BrowsePage from './pages/BrowsePage';
import ReportPage from './pages/ReportPage';
import ItemDetailPage from './pages/ItemDetailPage';
import DashboardPage from './pages/DashboardPage';
import MessagesPage from './pages/MessagesPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/item/:id" element={<ItemDetailPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/report-lost" element={<ReportPage type="lost" />} />
              <Route path="/report-found" element={<ReportPage type="found" />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/messages" element={<MessagesPage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;