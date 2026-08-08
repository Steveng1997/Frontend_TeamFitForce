import React from 'react';
import { useApp } from '../context/AppContext';

export const StatusBar: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div
      className={`w-full px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold select-none z-50 transition-colors duration-300 ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}
    >
      {/* Time */}
      <span className="font-extrabold tracking-tight text-[13px]">9:41</span>

      {/* Status Icons */}
      <div className="flex items-center space-x-2">
        {/* Signal Bars */}
        <div className="flex items-end space-x-[2px] h-3">
          <div className={`w-[3px] h-[4px] rounded-xs ${isDark ? 'bg-white' : 'bg-slate-900'}`} />
          <div className={`w-[3px] h-[6px] rounded-xs ${isDark ? 'bg-white' : 'bg-slate-900'}`} />
          <div className={`w-[3px] h-[8px] rounded-xs ${isDark ? 'bg-white' : 'bg-slate-900'}`} />
          <div className={`w-[3px] h-[10px] rounded-xs ${isDark ? 'bg-white' : 'bg-slate-900'}`} />
        </div>

        {/* Wi-Fi Icon */}
        <svg
          className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-slate-900'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 18c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-4.95-3.54l1.41 1.41C9.64 14.69 10.77 14 12 14s2.36.69 3.54 1.87l1.41-1.41C15.42 12.93 13.78 12 12 12s-3.42.93-4.95 2.46zm-3.54-3.53l1.41 1.41C6.72 10.54 9.22 9.5 12 9.5s5.28 1.04 7.07 2.84l1.41-1.41C18.28 8.73 15.29 7.5 12 7.5s-6.28 1.23-8.49 3.43z" />
        </svg>

        {/* Battery Icon */}
        <div className="flex items-center space-x-[1px]">
          <div
            className={`w-[22px] h-[11px] rounded-[3px] border p-[1px] flex items-center ${
              isDark ? 'border-white/80' : 'border-slate-800'
            }`}
          >
            <div className={`h-full w-full rounded-[1px] ${isDark ? 'bg-white' : 'bg-slate-900'}`} />
          </div>
          <div className={`w-[1.5px] h-[4px] rounded-r-[1px] ${isDark ? 'bg-white/80' : 'bg-slate-800'}`} />
        </div>
      </div>
    </div>
  );
};

