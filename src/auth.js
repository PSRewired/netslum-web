import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import { cookies } from 'next/headers';
import { DateTime } from 'luxon';
import jwt from 'jsonwebtoken';
import { encrypt } from '@/util/Encryption.js';

function createJwt(account) {
  const secret = process.env.JWT_SECRET;

   return jwt.sign(account, secret, { expiresIn: `${account.expires_at}s` });
}

/**
 * Sets the JWT cookie for backend API auth.
 */
async function setTokenCookie(account, token) {
  const jwt = createJwt({
    ...token,
    at_hash: await encrypt(account.access_token),
  });
  const expires =  DateTime.fromSeconds(account.expires_at).toJSDate();

  (await cookies()).set({
    name: 'netslum-token',
    value: jwt,
    httpOnly: true,
    sameSite: 'Lax',
    expires,
  });
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord],
  events: {
    async signOut() {
      (await cookies()).delete('netslum-token');
    }
  },
  callbacks: {
    async jwt({ token, account }) {

      if (account) {
        token.expires_at = account.expires_at;

        await setTokenCookie(account, token, DateTime.fromSeconds(account.expires_at).toJSDate());
      }

      return token;
    },
  }
})