import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// ⚡ Energy Lightning Icon
export const LightningIcon: React.FC<IconProps> = ({ size = 24, color = '#10b981', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 👣 Footprints / Steps Icon
export const FootprintsIcon: React.FC<IconProps> = ({ size = 24, color = '#10b981', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M18.5 14C19.8807 14 21 12.8807 21 11.5C21 9.8 19.5 8 18 6.5C16.8 5.3 15.2 4 14.5 3.5C14.2 3.3 13.8 3.5 13.8 3.9C13.8 5.2 13.2 7 12.5 8C11.7 9.1 11 10.2 11 11.5C11 12.8807 12.1193 14 13.5 14H18.5Z"
      fill={color}
      opacity="0.9"
    />
    <path
      d="M5.5 21C6.88071 21 8 19.8807 8 18.5C8 16.8 6.5 15 5 13.5C3.8 12.3 2.2 11 1.5 10.5C1.2 10.3 0.8 10.5 0.8 10.9C0.8 12.2 0.2 14 -0.5 15C-1.3 16.1 -2 17.2 -2 18.5C-2 19.8807 -0.880712 21 0.5 21H5.5Z"
      fill={color}
      transform="translate(4, 0)"
    />
    <circle cx="7" cy="5" r="1.8" fill={color} />
    <circle cx="10" cy="3.5" r="1.5" fill={color} />
    <circle cx="17" cy="18" r="1.8" fill={color} />
    <circle cx="20" cy="16.5" r="1.5" fill={color} />
  </svg>
);

// 🔥 Calories / Energy Burned Icon
export const CaloriesIcon: React.FC<IconProps> = ({ size = 24, color = '#f59e0b', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2C12 2 7 7 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 7 12 2 12 2Z"
      fill={color}
    />
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 8.5 19.5 5.5 17 4C17 6.5 15.5 8.5 14 9.5C12.5 10.5 12 12 12 12C12 12 11.5 10 9.5 9C7.5 8 6 6 6 6C4 8 2 10 2 12C2 17.5228 6.47715 22 12 22Z"
      fill={color}
      opacity="0.3"
    />
  </svg>
);

// 🔥 Streak Flame Icon
export const FlameIcon: React.FC<IconProps> = ({ size = 24, color = '#f97316', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 22C16.4183 22 20 18.4183 20 14C20 10 16.5 7.5 14.5 4C13.5 6.5 11 7.5 10 9C8.5 7 8 5 8 2C4.5 6 4 10.5 4 14C4 18.4183 7.58172 22 12 22Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 18C13.6569 18 15 16.6569 15 15C15 13.5 13.5 12.5 12.5 11C11.5 12.5 10 13.5 10 15C10 16.6569 11.3431 18 12 18Z"
      fill="#ffffff"
      opacity="0.8"
    />
  </svg>
);

// ❤️ Heart HR Icon
export const HeartIcon: React.FC<IconProps> = ({ size = 24, color = '#ef4444', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
      fill={color}
    />
  </svg>
);

// 🥗 Salad / Food Fit Tab Icon
export const SaladTabIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3C7 3 3 7 3 12C3 16.5 6.5 20 11 20.9V21H13V20.9C17.5 20 21 16.5 21 12C21 7 17 3 12 3Z"
      fill={active ? '#10b981' : 'none'}
      stroke={active ? '#10b981' : '#94a3b8'}
      strokeWidth="2"
    />
    <path
      d="M7 10C8.5 7.5 11 7 14 8C17 9 18 11.5 18.5 13"
      stroke={active ? '#ffffff' : '#94a3b8'}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="10" cy="13" r="1.5" fill={active ? '#ffffff' : '#94a3b8'} />
    <circle cx="15" cy="12" r="1.5" fill={active ? '#ffffff' : '#94a3b8'} />
  </svg>
);

// 🩺 Stethoscope / Medical Tab Icon
export const StethoscopeTabIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M6 3V9C6 12.3137 8.68629 15 12 15C15.3137 15 18 12.3137 18 9V3"
      stroke={active ? '#10b981' : '#94a3b8'}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 15V18C12 19.6569 13.3431 21 15 21H18"
      stroke={active ? '#10b981' : '#94a3b8'}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="19" cy="21" r="2" fill={active ? '#10b981' : 'none'} stroke={active ? '#10b981' : '#94a3b8'} strokeWidth="2" />
    <circle cx="6" cy="3" r="1.5" fill={active ? '#10b981' : '#94a3b8'} />
    <circle cx="18" cy="3" r="1.5" fill={active ? '#10b981' : '#94a3b8'} />
  </svg>
);

// 🏋️ Workout Person Training Icon
export const PersonTrainingIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="4" r="2" fill={active ? '#10b981' : '#94a3b8'} />
    <path
      d="M4 17L8 12L12 14L16 10L20 12"
      stroke={active ? '#10b981' : '#94a3b8'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14V21M9 21H15"
      stroke={active ? '#10b981' : '#94a3b8'}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// 🏋️ Person Lifting Weight Icon
export const PersonLiftingWeightIcon: React.FC<IconProps> = ({ size = 24, color = '#10b981', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="4" r="2" fill={color} />
    <path d="M6 7H18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M4 5V9M20 5V9" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 9V15M9 20L12 15L15 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 🍽️ Food Plate Icon
export const FoodPlateIcon: React.FC<IconProps> = ({ size = 24, color = '#3b82f6', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
    <path d="M7 12H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 🤖 Robot AI Coach Icon (Tab & Header)
export const RobotCoachIcon: React.FC<{ active?: boolean; size?: number; color?: string }> = ({
  active = false,
  size = 24,
  color,
}) => {
  const iconColor = color || (active ? '#10b981' : '#94a3b8');
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="6" width="16" height="12" rx="4" fill={active ? iconColor : 'none'} stroke={iconColor} strokeWidth="2" />
      <circle cx="9" cy="11" r="1.5" fill={active ? '#ffffff' : iconColor} />
      <circle cx="15" cy="11" r="1.5" fill={active ? '#ffffff' : iconColor} />
      <path d="M12 2V6" stroke={iconColor} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="2" r="1.5" fill={iconColor} />
      <path d="M9 15H15" stroke={active ? '#ffffff' : iconColor} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

// 🤖 Large Robot Avatar
export const RobotAvatarIcon: React.FC<{ size?: number; className?: string }> = ({ size = 96, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <circle cx="50" cy="50" r="48" fill="url(#robotGradient)" stroke="#f59e0b" strokeWidth="2.5" />
    <defs>
      <radialGradient id="robotGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(48)">
        <stop stopColor="#10b981" />
        <stop offset="1" stopColor="#059669" />
      </radialGradient>
    </defs>
    <rect x="47" y="14" width="6" height="12" rx="3" fill="#ffffff" />
    <circle cx="50" cy="12" r="4" fill="#f59e0b" />
    <rect x="22" y="26" width="56" height="48" rx="16" fill="#0f172a" stroke="#ffffff" strokeWidth="2.5" />
    <rect x="16" y="40" width="6" height="20" rx="3" fill="#10b981" />
    <rect x="78" y="40" width="6" height="20" rx="3" fill="#10b981" />
    <rect x="28" y="34" width="44" height="20" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
    <circle cx="40" cy="44" r="5" fill="#10b981" />
    <circle cx="60" cy="44" r="5" fill="#10b981" />
    <circle cx="41.5" cy="42.5" r="2" fill="#ffffff" />
    <circle cx="61.5" cy="42.5" r="2" fill="#ffffff" />
    <path d="M 38 60 Q 50 67 62 60" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
  </svg>
);

// 🏠 Home Icon
export const HomeTabIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V14H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
      fill={active ? '#10b981' : 'none'}
      stroke={active ? '#10b981' : '#94a3b8'}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

// 🎙️ Mic Icon (Asistente Voz)
export const MicIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C10.3431 2 9 3.34315 9 5V11C9 12.6569 10.3431 14 12 14C13.6569 14 15 12.6569 15 11V5C15 3.34315 13.6569 2 12 2Z" fill={color} />
    <path d="M19 10V11C19 14.866 15.866 18 12 18C8.13401 18 5 14.866 5 11V10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 18V22M8 22H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 📷 Scan Icon (Escanear Plato)
export const ScanIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 7V5C3 3.89543 3.89543 3 5 3H7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M17 3H19C20.1046 3 21 3.89543 21 5V7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M21 17V19C21 20.1046 20.1046 21 19 21H17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M7 21H5C3.89543 21 3 20.1046 3 19V17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="7" y1="12" x2="17" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 🎵 Spotify Icon
export const SpotifyIcon: React.FC<{ size?: number; className?: string }> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#1db954" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M16.8 15.6C16.6 15.9 16.2 16 15.9 15.8C13.7 14.5 10.9 14.2 6.8 15.1C6.4 15.2 6.1 14.9 6 14.5C5.9 14.1 6.2 13.8 6.6 13.7C11 12.7 14.1 13.1 16.6 14.6C16.9 14.8 17 15.3 16.8 15.6ZM18.2 12.7C17.9 13.1 17.4 13.2 17 13C14.2 11.3 9.9 10.8 6.4 11.9C5.9 12 5.4 11.7 5.3 11.2C5.2 10.7 5.5 10.2 6 10.1C10.1 8.8 14.8 9.4 18 11.3C18.4 11.6 18.5 12.2 18.2 12.7ZM18.3 9.6C15.1 7.7 9.6 7.5 6.2 8.5C5.6 8.7 5 8.3 4.8 7.7C4.6 7.1 5 6.5 5.6 6.3C9.6 5.1 15.6 5.4 19.3 7.6C19.9 7.9 20.1 8.7 19.7 9.2C19.4 9.7 18.8 9.9 18.3 9.6Z" fill="#ffffff" />
  </svg>
);

// 🔴 YouTube Music Icon
export const YouTubeMusicIcon: React.FC<{ size?: number; className?: string }> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#FF0000" />
    <circle cx="12" cy="12" r="5" fill="#FF0000" stroke="#FFFFFF" strokeWidth="2" />
    <path d="M10.5 9.5L14.5 12L10.5 14.5V9.5Z" fill="#FFFFFF" />
  </svg>
);

// 🍎 Apple Music Icon
export const AppleMusicIcon: React.FC<{ size?: number; className?: string }> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#FA243C" />
    <path
      d="M15 7.5V13.8A2.2 2.2 0 1 1 13.5 12C14 12 14.5 12.2 15 12.5V9.2L9.5 10.5V14.8A2.2 2.2 0 1 1 8 13C8.5 13 9 13.2 9.5 13.5V8.5L15 7.5Z"
      fill="#FFFFFF"
    />
  </svg>
);

// ⏱️ Stopwatch / Rest Icon
export const StopwatchIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="13" r="8" stroke={color} strokeWidth="2" />
    <path d="M12 9V13L15 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 2H14M12 2V5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ↗️ Share Icon
export const ShareIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 12V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 3V15M12 3L7 8M12 3L17 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ← Arrow Left Icon
export const ArrowLeftIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// + Plus Icon
export const PlusIcon: React.FC<IconProps> = ({ size = 18, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 5V19M5 12H19" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// - Minus Icon
export const MinusIcon: React.FC<IconProps> = ({ size = 18, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 12H19" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ✓ Check Icon
export const CheckIcon: React.FC<IconProps> = ({ size = 18, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20 6L9 17L4 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 🛡️ Biometric Shield Lock Icon
export const BiometricShieldIcon: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="46" fill="#1e293b" stroke="#10b981" strokeWidth="3" />
    <circle cx="50" cy="50" r="40" fill="url(#shieldBg)" />
    <defs>
      <linearGradient id="shieldBg" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10b981" stopOpacity="0.2" />
        <stop offset="1" stopColor="#059669" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    <path
      d="M50 22 C64 22 72 26 72 26 V46 C72 62 50 78 50 78 C50 78 28 62 28 46 V26 C28 26 36 22 50 22 Z"
      fill="#10b981"
      stroke="#ffffff"
      strokeWidth="2"
    />
    <rect x="43" y="44" width="14" height="18" rx="4" fill="#0f172a" />
    <circle cx="50" cy="40" r="7" stroke="#0f172a" strokeWidth="3.5" fill="none" />
    <circle cx="50" cy="50" r="2" fill="#10b981" />
    <path d="M50 52 V58" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ☁️ Upload Cloud Icon
export const UploadCloudIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M7 16C4.79086 16 3 14.2091 3 12C3 10.0929 4.33446 8.49752 6.12648 8.09702C6.56891 5.7533 8.62141 4 11.1 4C13.5298 4 15.5475 5.6791 16.0335 7.94632C17.7289 8.28612 19 9.77123 19 11.5556C19 13.5684 17.3684 15.2 15.3556 15.2M12 11V21M12 11L8.5 14.5M12 11L15.5 14.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 👤 Profile Tab Icon
export const ProfileTabIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="7" r="4" fill={active ? '#10b981' : 'none'} stroke={active ? '#10b981' : '#94a3b8'} strokeWidth="2" />
    <path
      d="M4 21C4 17.134 7.58172 14 12 14C16.4183 14 20 17.134 20 21"
      stroke={active ? '#10b981' : '#94a3b8'}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

