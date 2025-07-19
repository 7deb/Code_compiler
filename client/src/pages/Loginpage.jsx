import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@headlessui/react';

const LoginPage = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const login = useAuthStore((state) => state.login);
  const isLoggingin = useAuthStore((state) => state.isLoggingin);
  const [formdata, setFormdata] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formdata);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100 w-96 shadow-sm space-y-4 p-6">
          <div className="badge badge-ghost">
            <input
              className="input w-full input-xl"
              type="email"
              placeholder="Email"
              value={formdata.email}
              onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
              required
            />
          </div>
          <div className="badge badge-ghost">
            <input
              className="input w-full input-md"
              type="password"
              placeholder="Password"
              value={formdata.password}
              onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoggingin}
            className="w-full px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600 disabled:opacity-50"
          >
            {isLoggingin ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;