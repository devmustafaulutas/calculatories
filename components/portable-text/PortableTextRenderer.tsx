import Image from "next/image";
import Link from "next/link";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { Citation } from "@/components/seo/Citation";
import { urlFor } from "@/sanity/lib/client";
import { slugifyHeading } from "@/sanity/lib/plain-text";

interface PortableTextRendererProps {
  value: PortableTextBlock[] | unknown;
}

function headingId(children: React.ReactNode): string {
  const text =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.map((c) => (typeof c === "string" ? c : "")).join("")
        : "";
  return slugifyHeading(text);
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2
        id={headingId(children)}
        className="text-2xl font-bold mt-8 mb-4"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={headingId(children)}
        className="text-xl font-semibold mt-6 mb-3"
      >
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-muted pl-4 italic text-muted-foreground mb-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    citation: ({ value, children }) => (
      <Citation
        label={(value?.label as string) ?? String(children)}
        url={value?.url as string}
        nofollow={value?.nofollow as boolean | undefined}
      />
    ),
    internalLink: ({ value, children }) => {
      const href = value?.href as string | undefined;
      if (!href) return <>{children}</>;
      return (
        <Link href={href} className="text-primary hover:underline">
          {children}
        </Link>
      );
    },
    externalLink: ({ value, children }) => (
      <a
        href={value?.href as string}
        className="text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    link: ({ value, children }) => {
      const href = value?.href as string | undefined;
      if (!href) return <>{children}</>;
      if (href.startsWith("/")) {
        return (
          <Link href={href} className="text-primary hover:underline">
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(1200).quality(85).url();
      return (
        <figure className="my-6">
          <Image
            src={src}
            alt={(value.alt as string) ?? ""}
            width={1200}
            height={675}
            className="rounded-lg w-full h-auto"
          />
        </figure>
      );
    },
  },
};

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value || !Array.isArray(value) || value.length === 0) return null;
  return (
    <PortableText
      value={value as PortableTextBlock[]}
      components={components}
    />
  );
}
