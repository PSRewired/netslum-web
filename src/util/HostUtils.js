import { headers } from 'next/headers';

/**
 * Gets the active host header from the server or returns the hostname override defined by NEXT_PUBLIC_API_URI
 * @returns {string}
 */
export const getServerHost = () => {
  if (!!process.env.NEXT_PUBLIC_API_URI) {
    return process.env.NEXT_PUBLIC_API_URI;
  }

  return `https://${host}`;
};
