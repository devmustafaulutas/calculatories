import { z } from "zod";

export const AuthorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  role: z.string().min(1),
  jobTitle: z.string().min(1),
  bio: z.string().min(1),
  credentials: z.array(z.string()),
  avatar: z.string().min(1),
  sameAs: z.array(z.string().url()),
  knowsAbout: z.array(z.string()),
  email: z.string().email(),
});

export type Author = z.infer<typeof AuthorSchema>;
