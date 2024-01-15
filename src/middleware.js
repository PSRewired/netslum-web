import createMiddleware from 'next-intl/middleware';

// next-intl broke their imports for whatever reason. remove the "double default"
// import whenever they decide to fix their shit
export default createMiddleware.default({
  defaultLocale: 'en',
  locales: ['en', 'jp'],
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(de|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
