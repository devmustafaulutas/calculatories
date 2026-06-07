import type { PortableTextBlock } from "@portabletext/types";

export function portableTextToPlainText(
  blocks: unknown,
  maxLength?: number,
): string {
  if (!Array.isArray(blocks)) return "";

  const text = (blocks as PortableTextBlock[])
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children
        .map((child) =>
          "text" in child && typeof child.text === "string" ? child.text : "",
        )
        .join("");
    })
    .join("\n")
    .trim();

  if (maxLength && text.length > maxLength) {
    return `${text.slice(0, maxLength - 1)}…`;
  }

  return text;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
