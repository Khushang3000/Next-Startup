// Auth setup for NextAuth + GitHub provider
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"

// Ensure GitHub provider is configured with env vars (safe defaults to avoid runtime crash)
const githubProvider = GitHub({
  clientId: process.env.GITHUB_ID ?? "",
  clientSecret: process.env.GITHUB_SECRET ?? "",
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [githubProvider],
  callbacks: {
    // After successful provider sign-in
    async signIn({ user, profile }) {
      const name = user?.name ?? "";
      const email = user?.email ?? "";
      const image = user?.image ?? "";
      // GitHub profile id can be string; sanity schema stores `id` as a number — coerce safely
      const rawGithubId = profile?.id;
      const githubId = rawGithubId ? Number(rawGithubId) : undefined;
      const login = profile?.login ?? "";
      const bio = profile?.bio ?? "";

      if (!githubId || Number.isNaN(githubId)) return true;

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
        const rawGithubId = profile?.id;
        const githubId = rawGithubId ? Number(rawGithubId) : undefined;
        if (githubId && !Number.isNaN(githubId)) {
          const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: githubId });
          token.id = user?._id;
        }
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
