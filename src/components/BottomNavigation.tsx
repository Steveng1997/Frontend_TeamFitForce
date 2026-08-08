import React from 'react';
import { useApp } from '../context/AppContext';
import {
  HomeTabIcon,
  SaladTabIcon,
  PersonTrainingIcon,
  StethoscopeTabIcon,
  RobotCoachIcon,
} from './SvgIcons';
import type { TabType } from '../types';

export const BottomNavigation: React.FC = () => {
  const { activeTab, navigate, theme } = useApp();
  const isDark = theme === 'dark';

  const tabs: {
    id: TabType;
    label: string;
    icon: (active: boolean) => React.ReactNode;
  }[] = [
    {
      id: 'inicio',
      label: 'Inicio',
      icon: (active) => <HomeTabIcon active={active} size={22} />,
    },
    {
      id: 'food_fit',
      label: 'Food Fit',
      icon: (active) => <SaladTabIcon active={active} size={22} />,
    },
    {
      id: 'rutinas',
      label: 'Rutinas',
      icon: (active) => <PersonTrainingIcon active={active} size={22} />,
    },
    {
      id: 'medica',
      label: 'Médica',
      icon: (active) => <StethoscopeTabIcon active={active} size={22} />,
    },
    {
      id: 'coach',
      label: 'Coach',
      icon: (active) => <RobotCoachIcon active={active} size={22} />,
    },
  ];

  const handleTabClick = (tabId: TabType) => {
    if (tabId === 'inicio') navigate('home', 'inicio');
    else if (tabId === 'food_fit') navigate('food_fit', 'food_fit');
    else if (tabId === 'rutinas') navigate('routine', 'rutinas');
    else if (tabId === 'medica') navigate('medical', 'medica');
    else if (tabId === 'coach') navigate('coach', 'coach');
  };

  return (
    <nav
      className={`w-full backdrop-blur-xl border-t px-2 py-2 flex items-center justify-around z-40 transition-colors duration-300 ${
        isDark
          ? 'bg-[#0f172a]/95 border-slate-800/80 text-white'
          : 'bg-white/95 border-slate-200 text-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]'
      }`}
    >
      {tabs.map((t) => {
        const isActive = activeTab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => handleTabClick(t.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 px-2 py-1 rounded-xl cursor-pointer ${
              isActive
                ? 'text-[#10b981] scale-105 font-bold'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              {t.icon(isActive)}
              {t.id === 'coach' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#10b981] rounded-full animate-ping opacity-75"></span>
              )}
            </div>
            <span
              className={`text-[10px] font-medium mt-1 tracking-tight ${
                isActive
                  ? 'text-[#10b981] font-extrabold'
                  : isDark
                  ? 'text-slate-400'
                  : 'text-slate-500'
              }`}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
