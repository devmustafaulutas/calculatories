import Link from "next/link";
import type { Author } from "@/data/schemas/author";
import { getAuthor } from "@/lib/authors";
import { authorPath } from "@/lib/urls";

interface BylineProps {
  authorId: string;
  reviewerId?: string;
  author?: Author;
  reviewer?: Author;
}

export async function Byline({
  authorId,
  reviewerId,
  author: authorProp,
  reviewer: reviewerProp,
}: BylineProps) {
  const author = authorProp ?? (await getAuthor(authorId));
  const reviewer =
    reviewerProp ?? (reviewerId ? await getAuthor(reviewerId) : undefined);

  if (!author) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground border-b pb-4 mb-6">
      <span>
        Written by{" "}
        <Link
          href={authorPath(author.slug)}
          className="font-medium text-foreground hover:underline"
        >
          {author.name}
        </Link>
        {author.credentials.length > 0 && (
          <span className="text-muted-foreground">
            {" "}
            ({author.credentials.join(", ")})
          </span>
        )}
      </span>
      {reviewer && (
        <span>
          Reviewed by{" "}
          <Link
            href={authorPath(reviewer.slug)}
            className="font-medium text-foreground hover:underline"
          >
            {reviewer.name}
          </Link>
          {reviewer.credentials.length > 0 && (
            <span className="text-muted-foreground">
              {" "}
              ({reviewer.credentials.join(", ")})
            </span>
          )}
        </span>
      )}
    </div>
  );
}
