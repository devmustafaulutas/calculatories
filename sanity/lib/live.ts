import { defineLive } from "next-sanity/live";
import type { QueryParams } from "next-sanity";
import { client, projectId } from "./client";
import { sanityReadToken } from "./token";

function createLiveApi() {
  if (!client || !projectId) {
    return {
      sanityFetch: async <T>(_options: {
        query: string;
        params?: QueryParams;
      }): Promise<T> => {
        throw new Error(
          "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID.",
        );
      },
      SanityLive: function SanityLiveStub() {
        return null;
      },
    };
  }

  return defineLive({
    client: client.withConfig({ useCdn: false }),
    serverToken: sanityReadToken,
    browserToken: sanityReadToken,
  });
}

export const { sanityFetch, SanityLive } = createLiveApi();
