// lib/auth.ts (bagian callbacks)
callbacks: {
  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.sub as string;
      session.user.role = token.role as string;
      session.user.isPremium = token.isPremium as boolean;
    }
    return session; // ✅ Tambahkan return
  },
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.role = user.role;
      token.isPremium = user.isPremium;
    }
    return token; // ✅ Tambahkan return
  }
}