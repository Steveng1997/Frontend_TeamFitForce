import React, { useEffect, useState } from 'react';

export const Waveform: React.FC<{ isMuted?: boolean }> = ({ isMuted = false }) => {
  const [heights, setHeights] = useState<number[]>([20, 45, 75, 30, 90, 60, 100, 40, 80, 50, 95, 35, 70, 40, 85, 30]);

  useEffect(() => {
    if (isMuted) return;

    const interval = setInterval(() => {
      setHeights(
        Array.from({ length: 16 }, () => Math.floor(Math.random() * 85) + 15)
      );
    }, 180);

    return () => clearInterval(interval);
  }, [isMuted]);

  return (
    <div className="flex items-center justify-center space-x-1.5 h-16 px-4 py-2">
      {heights.map((h, index) => (
        <div
          key={index}
          className="w-1.5 rounded-full transition-all duration-200 bg-gradient-to-t from-[#f39c12] to-[#f1c40f]"
          style={{
            height: isMuted ? '6px' : `${h}%`,
            opacity: isMuted ? 0.3 : 0.9,
          }}
        />
      ))}
    </div>
  );
};
