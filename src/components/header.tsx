'use client';

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { PiListDuotone } from 'react-icons/pi';
import { Container } from '~/components/container';
import { CommandBar } from './pagefind/command-bar';
import {
  ChefIcon,
  GamingIcon,
  GoodreadsIcon,
  InstagramIcon,
  MailIcon,
} from './social-icons';
import avatarImage from '~public/images/home/me.webp';

function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ChevronDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 8 6" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SunIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  );
}

function MoonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MobileNavItem({
  href,
  children,
  isIcon = false,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  isIcon?: boolean;
  target?: string;
}) {
  // Generate random rotation between -5 and -1 OR 1 and 5 degrees (avoiding 0)
  const randomRotation =
    Math.random() < 0.5
      ? Math.floor(Math.random() * 4) - 5 // -5 to -2
      : Math.floor(Math.random() * 4) + 2; // 2 to 5

  return (
    <li>
      <PopoverButton
        prefetch
        as={Link}
        className="block text-2xl"
        href={href}
        style={
          isIcon ? { transform: `rotate(${randomRotation}deg)` } : undefined
        }
        {...props}
      >
        {children}
      </PopoverButton>
    </li>
  );
}
function MobileNavigation(
  props: React.ComponentPropsWithoutRef<typeof Popover>,
) {
  return (
    <Popover {...props}>
      <PopoverButton
        aria-label="Open navigation menu"
        className="group button-press focus-ring theme-transition flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
      >
        <PiListDuotone className="h-6 w-6 text-blue-500 dark:text-zinc-200" />
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-xs duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-black/80"
      />
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 bottom-8 z-50 origin-bottom rounded-3xl bg-white p-8 shadow-[0_-30px_60px_rgba(0,0,0,0.12),0_-4px_6px_rgba(0,0,0,0.1)] ring-1 ring-zinc-900/5 duration-150 data-closed:translate-y-8 data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-zinc-900 dark:ring-zinc-800"
      >
        <div className="absolute top-6 right-6">
          <PopoverButton
            aria-label="Close menu"
            className="-m-1 p-1"
            name="Close Navigation"
          >
            <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
          </PopoverButton>
        </div>
        <nav className="mt-6">
          <ul className="space-y-6 [&>li]:pb-6 [&>li:first-child]:pt-0 [&>li:last-child]:pb-0 [&>li:not(:last-child)]:border-b [&>li:not(:last-child)]:border-zinc-200/70 dark:[&>li:not(:last-child)]:border-zinc-700/50">
            <MobileNavItem href="/about">About</MobileNavItem>
            <MobileNavItem href="/writings">Writings</MobileNavItem>
            {/* <MobileNavItem href="/travels">Travels</MobileNavItem> */}
            <MobileNavItem href="/reads">Reads</MobileNavItem>
            <MobileNavItem href="/photos">Photos</MobileNavItem>
            <MobileNavItem href="/fragments">Fragments</MobileNavItem>
            <div className="flex flex-row gap-8">
              <MobileNavItem
                isIcon
                href="mailto:hello@shovanch.com"
                target="_blank"
              >
                <div className="-ml-2 flex items-center">
                  <MailIcon className="h-10 w-10 flex-none fill-zinc-900 transition group-hover:fill-blue-500 dark:fill-zinc-200" />{' '}
                </div>
              </MobileNavItem>
              <MobileNavItem
                isIcon
                href="https://www.instagram.com/theelysianwanderer/"
                target="_blank"
              >
                <div className="-ml-2 flex items-center">
                  <InstagramIcon className="h-10 w-10 flex-none fill-zinc-900 transition group-hover:fill-blue-500 dark:fill-zinc-200" />{' '}
                </div>
              </MobileNavItem>
              <MobileNavItem
                isIcon
                href="https://steamcommunity.com/id/ElysianSpectre/"
                target="_blank"
              >
                <div className="-ml-2 flex items-center gap-2">
                  <GamingIcon className="h-10 w-10 flex-none fill-zinc-900 transition group-hover:fill-blue-500 dark:fill-zinc-200" />{' '}
                </div>
              </MobileNavItem>
              <MobileNavItem
                isIcon
                href="https://www.instagram.com/enchantedforks"
                target="_blank"
              >
                <div className="-ml-2 flex items-center gap-2">
                  <ChefIcon className="h-10 w-10 flex-none fill-zinc-900 transition group-hover:fill-blue-500 dark:fill-zinc-200" />{' '}
                </div>
              </MobileNavItem>
              <MobileNavItem
                isIcon
                href="https://www.goodreads.com/shovanch"
                target="_blank"
              >
                <div className="-ml-2 flex items-center gap-2">
                  <GoodreadsIcon className="h-10 w-10 flex-none fill-zinc-900 transition group-hover:fill-blue-500 dark:fill-zinc-200" />{' '}
                </div>
              </MobileNavItem>
              {/* <MobileNavItem
                href="https://www.pinterest.com/theelysianwanderer/"
                target="_blank"
              >
                <div className="flex items-center gap-2 -ml-2">
                  <PinterestIcon className="h-10 w-10 flex-none dark:fill-zinc-200 fill-zinc-900 transition group-hover:fill-blue-500" />{" "}
                </div>
              </MobileNavItem> */}
              {/* <MobileNavItem
                href="https://www.chess.com/stats/overview/shovanc"
                target="_blank"
              >
                <div className="flex items-center gap-2 -ml-2">
                  <ChessIcon className="h-10 w-10 flex-none dark:fill-zinc-200 fill-zinc-900 transition group-hover:fill-blue-500" />{" "}
                </div>
              </MobileNavItem> */}
            </div>
          </ul>
        </nav>
      </PopoverPanel>
    </Popover>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <li>
      <Link
        prefetch
        className={clsx(
          'focus-ring theme-transition relative block px-3 py-2 font-medium tracking-widest uppercase',
          isActive
            ? 'font-bold! text-blue-600 dark:text-blue-400'
            : 'hover:text-blue-500 dark:hover:text-blue-400',
        )}
        href={href}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0" />
        )}
      </Link>
    </li>
  );
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav {...props}>
      <ul className="theme-transition flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem href="/about">About</NavItem>
        <NavItem href="/writings">Writings</NavItem>
        {/* <NavItem href="/travels">Travels</NavItem> */}
        <NavItem href="/reads">Reads</NavItem>
        <NavItem href="/photos">Photos</NavItem>
        <NavItem href="/fragments">Fragments</NavItem>
      </ul>
    </nav>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
        type="button"
      >
        <div className="h-6 w-6" />
      </button>
    );
  }

  return (
    <button
      aria-label={`Switch to ${otherTheme} theme`}
      className="group cursor-pointer rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      type="button"
      onClick={() => setTheme(otherTheme)}
    >
      <div className="relative h-6 w-6">
        <MoonIcon
          className="absolute inset-0 h-6 w-6 fill-zinc-100 stroke-zinc-500 group-hover:fill-zinc-200 group-hover:stroke-zinc-700 [@media(prefers-color-scheme:dark)]:fill-blue-50 [@media(prefers-color-scheme:dark)]:stroke-blue-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-blue-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-blue-600"
          style={{
            transform: isDark
              ? 'scale(0) rotate(-180deg)'
              : 'scale(1) rotate(0deg)',
            opacity: isDark ? 0 : 1,
            transition:
              'transform 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <SunIcon
          className="absolute inset-0 h-6 w-6 fill-zinc-700 stroke-zinc-300"
          style={{
            transform: isDark
              ? 'scale(1) rotate(0deg)'
              : 'scale(0) rotate(180deg)',
            opacity: isDark ? 1 : 0,
            transition:
              'transform 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </button>
  );
}

function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.min(Math.max(number, min), max);
}

function AvatarContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10',
      )}
      {...props}
    />
  );
}

function Avatar({
  large = false,
  isHomepage = false,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  large?: boolean;
  isHomepage?: boolean;
}) {
  return (
    <Link
      prefetch
      aria-label="Home"
      className={clsx(className, 'pointer-events-auto')}
      href={isHomepage ? '/about' : '/'}
      {...props}
    >
      <Image
        priority
        alt="Shovan Avatar Image"
        className={clsx(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          isHomepage &&
            'bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10',
          large ? 'h-16 w-16' : 'h-9 w-9',
        )}
        placeholder="blur"
        sizes={large ? '4rem' : '2.25rem'}
        src={avatarImage}
      />
    </Link>
  );
}

export function Header() {
  const isHomePage = usePathname() === '/';

  const headerReference = useRef<React.ElementRef<'div'>>(null);
  const avatarReference = useRef<React.ElementRef<'div'>>(null);
  const isInitial = useRef(true);

  useEffect(() => {
    const downDelay = avatarReference.current?.offsetTop ?? 0;
    const upDelay = 64;

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value);
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property);
    }

    function updateHeaderStyles() {
      if (!headerReference.current) {
        return;
      }

      const { top, height } = headerReference.current.getBoundingClientRect();
      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight,
      );

      if (isInitial.current) {
        setProperty('--header-position', 'sticky');
      }

      setProperty('--content-offset', `${downDelay}px`);

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`);
        setProperty('--header-mb', `${-downDelay}px`);
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay);
        setProperty('--header-height', `${offset}px`);
        setProperty('--header-mb', `${height - offset}px`);
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`);
        setProperty('--header-mb', `${-scrollY}px`);
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed');
        removeProperty('--header-top');
        removeProperty('--avatar-top');
      } else {
        removeProperty('--header-inner-position');
        setProperty('--header-top', '0px');
        setProperty('--avatar-top', '0px');
      }
    }

    function updateAvatarStyles() {
      if (!isHomePage) {
        return;
      }

      const fromScale = 1;
      const toScale = 36 / 64;
      const fromX = 0;
      const toX = 2 / 16;

      const scrollY = downDelay - window.scrollY;

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
      scale = clamp(scale, fromScale, toScale);

      let x = (scrollY * (fromX - toX)) / downDelay + toX;
      x = clamp(x, fromX, toX);

      setProperty(
        '--avatar-image-transform',
        `translate3d(${x}rem, 0, 0) scale(${scale})`,
      );

      const borderScale = 1 / (toScale / scale);
      const borderX = (-toX + x) * borderScale;
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

      setProperty('--avatar-border-transform', borderTransform);
      setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0');
    }

    function updateStyles() {
      updateHeaderStyles();
      updateAvatarStyles();
      isInitial.current = false;
    }

    updateStyles();
    window.addEventListener('scroll', updateStyles, { passive: true });
    window.addEventListener('resize', updateStyles);

    return () => {
      window.removeEventListener('scroll', updateStyles);
      window.removeEventListener('resize', updateStyles);
    };
  }, [isHomePage]);

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-none flex-col"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarReference}
              className="order-last mt-[calc(--spacing(16)-(--spacing(2)))]"
            />
            <Container
              className="top-0 order-last -mb-3 pt-3"
              style={{
                position:
                  'var(--header-position)' as React.CSSProperties['position'],
              }}
            >
              <div
                className="top-(--avatar-top,--spacing(3)) w-full"
                style={{
                  position:
                    'var(--header-inner-position)' as React.CSSProperties['position'],
                }}
              >
                <div className="relative">
                  <AvatarContainer
                    className="absolute top-3 left-0 origin-left transition-opacity"
                    style={{
                      opacity: 'var(--avatar-border-opacity, 0)',
                      transform: 'var(--avatar-border-transform)',
                    }}
                  />
                  <Avatar
                    large
                    className="block h-16 w-16 origin-left"
                    isHomepage={isHomePage}
                    style={{ transform: 'var(--avatar-image-transform)' }}
                  />
                </div>
              </div>
            </Container>
          </>
        )}
        <div
          ref={headerReference}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position:
              'var(--header-position)' as React.CSSProperties['position'],
          }}
        >
          <Container
            className="top-(--header-top,--spacing(6)) w-full"
            style={{
              position:
                'var(--header-inner-position)' as React.CSSProperties['position'],
            }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage && (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                {/* Hide desktop nav on homepage while preserving space */}
                <DesktopNavigation
                  className={clsx(
                    'pointer-events-auto hidden md:block',
                    isHomePage && 'md:invisible',
                  )}
                />
              </div>
              <div className="flex justify-end gap-2 md:flex-1">
                <CommandBar />
                <div className="pointer-events-auto">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && (
        <div
          className="flex-none"
          style={{ height: 'var(--content-offset)' }}
        />
      )}
    </>
  );
}
