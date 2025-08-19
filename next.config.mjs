import path from 'path';
import { fileURLToPath } from 'url';

const withNextIntl = createNextIntlPlugin();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  turbopack: {},
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
    silenceDeprecations: ['legacy-js-api', 'import'],
    quietDeps: true,
  },
  images: {
    remotePatterns: [
      new URL('https://cdn.discordapp.com/avatars/**')
    ],
  }
};

export default withNextIntl(nextConfig);
