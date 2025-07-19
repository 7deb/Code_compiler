import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@headlessui/react';

const SignupPage = () => {
  const signup = useAuthStore((state) => state.signup);
  const isSigningUp = useAuthStore((state) => state.isSigningUp);
  const [formdata, setFormdata] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formdata.password !== formdata.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    await signup(formdata);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100 w-96 shadow-sm space-y-4 p-6">
          <div className="badge badge-ghost">
            <input
              className="input w-full input-xl"
              type="text"
              placeholder="Name"
              value={formdata.name}
              onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
              required
            />
          </div>
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
          <div className="badge badge-ghost">
            <input
              className="input w-full input-md"
              type="password"
              placeholder="Confirm Password"
              value={formdata.confirmPassword}
              onChange={(e) => setFormdata({ ...formdata, confirmPassword: e.target.value })}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSigningUp}
            className="w-full px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600 disabled:opacity-50"
          >
            {isSigningUp ? 'Signing up...' : 'Sign Up'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;