import { useEffect, useState } from 'react';
import logoWhite from '@/assets/thin-logo-white.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1800);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2300);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className={`flex flex-col items-center transition-all duration-700 ${
          isExiting ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <img
          src={logoWhite}
          alt="Filmology Labs"
          className="h-16 md:h-24 w-auto animate-pulse"
        />
        <div className="mt-8 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-white animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
