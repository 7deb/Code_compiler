import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import CompilerPage from './components/Compilerpage';
import Loginpage from './pages/Loginpage';
import SignupPage from './pages/SignupPage';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast'; 
import HomePage from './pages/Homepage';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // check if user is already logged in
  }, []);

  if (isCheckingAuth) return <div>Loading...</div>;

  return (
    <>
    <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }} 
      />
    <Routes>
      {authUser ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
    </>
  );
};

export default App;
