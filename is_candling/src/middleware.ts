import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      if (token) return true;
      return false;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/candling/:path*',
    '/incubator/:path*',
    '/profile/:path*',
  ],
};
