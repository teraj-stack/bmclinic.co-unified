import { PrismaAdapter } from '@auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { prisma } from './prisma';

const emailServer = process.env.EMAIL_SERVER?.trim();
const emailFrom = process.env.EMAIL_FROM?.trim();
const emailConfigured = Boolean(
  process.env.NEXTAUTH_SECRET &&
  process.env.DATABASE_URL &&
  emailFrom &&
  emailServer &&
  !emailServer.includes('smtp.dostawca.pl')
);

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  ...(emailConfigured ? { adapter: PrismaAdapter(prisma) as NextAuthOptions['adapter'] } : {}),
  providers: emailConfigured ? [EmailProvider({ server: emailServer, from: emailFrom })] : [],
  session: { strategy: 'jwt' },
  pages: { signIn: '/logowanie' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const role = (user as { role?: string }).role;
        token.role = role === 'ADMIN' || role === 'DOCTOR' ? role : 'PATIENT';
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role ?? '';
        session.user.id = token.userId ?? '';
      }
      return session;
    },
  },
};
