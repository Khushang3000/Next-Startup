// Auth setup for NextAuth + GitHub provider
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    // After successful provider sign-in
    async signIn({ user, profile }) {
      const name = user?.name ?? "";
      const email = user?.email ?? "";
      const image = user?.image ?? "";
      const githubId = profile?.id;
      const login = profile?.login ?? "";
      const bio = profile?.bio ?? "";

      if (!githubId) return true;

      const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: githubId });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: githubId,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },

    // Include sanity author id in the JWT
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });
        token.id = user?._id;
      }
      return token;
    },

    // Expose author id on session
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
})

// Note: route handler will be placed under app/api/auth/[...nextauth]/route.ts
