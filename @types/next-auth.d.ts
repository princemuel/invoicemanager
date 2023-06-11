export declare module 'next-auth' {
  interface Session {
    error?: 'RefreshAccessTokenError';
  }
}
export declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: 'RefreshAccessTokenError';
  }
}
