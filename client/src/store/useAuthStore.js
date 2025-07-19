import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingin: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/user');
      set({ authUser: res.data.user });
    } catch (error) {
      console.error('Error checking auth', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formdata) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/user/signup', formdata);
      set({ authUser: res.data.user });
      toast.success('Signup successful!');
    } catch (error) {
      console.error('Signup failed', error);
      toast.error('Signup failed');
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (formdata) => {
    set({ isLoggingin: true });
    try {
      const res = await axiosInstance.post('/user/login', formdata);
      set({ authUser: res.data.user });
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Login failed');
    } finally {
      set({ isLoggingin: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/user/logout');
      set({ authUser: null });
      toast.success('Logged out');
    } catch (error) {
      console.error('Logout failed', error);
    }
  },
}));
