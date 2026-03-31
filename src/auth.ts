import NextAuth from 'next-auth';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  trustHost: true,
});