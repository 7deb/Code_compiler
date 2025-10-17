import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const { authUser } = useAuthStore();

    return (
        <div className="w-full bg-black border-b border-cyan-500 px-6 py-3 font-mono">
            <div className="flex justify-between items-center">
                {/* Left section - Den title */}
                <span className=""></span>

                {/* Middle section - Empty space or additional elements */}
                <div className="flex-1 text-cyan-400 font-bold">hacker's_den</div>

                {/* Right section - User info */}
                <div className="flex items-center space-x-4">
                    {authUser && (
                        <span className="text-green-400">
                            hi Techy__.<b className='text-xl'>{authUser.name.split(' ')[0].toLowerCase()}</b>
                        </span>
                    )}
                </div>
            </div>

            {/* Navigation links - placed below the header */}
            <div className="flex justify-center mt-2 space-x-8 border-t border-gray-800 pt-2">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `text-sm ${isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-green-400'}`
                    }
                >
                    Den._Hackers
                </NavLink>
                <NavLink
                    to="/discuss"
                    className={({ isActive }) =>
                        `text-sm ${isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-green-400'}`
                    }
                >
                    meet_hackers_and_discuss
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `text-sm ${isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-green-400'}`
                    }
                >
                    About_the_den
                </NavLink>
            </div>

            {/* Glitch effect styles */}
            <style jsx>{`
        .text-cyan-400 {
          text-shadow: 0 0 5px rgba(34, 211, 238, 0.5);
        }
        .text-green-400 {
          text-shadow: 0 0 5px rgba(74, 222, 128, 0.5);
        }
      `}</style>
        </div>
    );
};

export default Navbar;