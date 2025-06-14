import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const LOCALES = ['en', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: 'ar',
  messages: {
    en: () => import('./messages/en.json'),
    ar: () => import('./messages/ar.json')
  }
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
