import InfoIcon from '~/svg/information.svg';
import BottomSheet from '../base/BottomSheet';
import ProjectView from './ProjectView';
import SunIcon from '~/svg/sun.svg';
import MoonIcon from '~/svg/moon.svg';
import { useMemo } from 'react';
import { Transition, animated } from 'react-spring';
import useTheme from '~/hooks/useTheme';

function ThemeSwitch() {
  const [theme, setTheme] = useTheme();
  const C = useMemo(() => (theme === 'dark' ? SunIcon : MoonIcon), [theme]);
  if (typeof window === 'undefined') return null;

  return (
    <Transition
      items={theme}
      from={{ opacity: 0, transform: 'rotate(180deg)' }}
      enter={{ opacity: 1, transform: 'rotate(0)' }}>
      {(style, theme) => (
        <animated.div style={style}>
          <C
            className="w-5 text-gray-600 dark:text-white cursor-pointer"
            onClick={() => {
              if (theme === 'dark') {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                setTheme('light');
              } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                setTheme('dark');
              }
            }}
          />
        </animated.div>
      )}
    </Transition>
  );
}

export default function Header() {
  return (
    <header
      suppressHydrationWarning
      className="fixed z-10 w-full flex justify-end items-center py-2 px-3 sm:p-4 space-x-4 h-14">
      <ThemeSwitch />
      <BottomSheet
        height={200}
        renderTrigger={({ open }) => (
          <InfoIcon
            className="w-5 sm:w-6 text-gray-600 dark:text-gray-200 cursor-pointer opacity-80"
            onClick={open}
          />
        )}>
        <ProjectView />
      </BottomSheet>
    </header>
  );
}
