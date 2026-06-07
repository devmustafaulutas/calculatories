type PortableBlock = Record<string, unknown>;

function parseInline(text: string): {
  children: Record<string, unknown>[];
  markDefs: Record<string, unknown>[];
} {
  const markDefs: Record<string, unknown>[] = [];
  const children: Record<string, unknown>[] = [];
  let keyIndex = 0;

  const citationRegex =
    /<Citation\s+label="([^"]*)"\s+url="([^"]*)"\s*\/>/g;
  const parts: { type: "text" | "citation"; value: string; url?: string }[] =
    [];
  let lastIndex = 0;
  let citeMatch;

  while ((citeMatch = citationRegex.exec(text)) !== null) {
    if (citeMatch.index > lastIndex) {
      parts.push({
        type: "text",
        value: text.slice(lastIndex, citeMatch.index),
      });
    }
    parts.push({
      type: "citation",
      value: citeMatch[1],
      url: citeMatch[2],
    });
    lastIndex = citeMatch.index + citeMatch[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }
  if (parts.length === 0) {
    parts.push({ type: "text", value: text });
  }

  for (const part of parts) {
    if (part.type === "citation") {
      const key = `cite-${keyIndex++}`;
      markDefs.push({
        _key: key,
        _type: "citation",
        label: part.value,
        url: part.url,
      });
      children.push({
        _type: "span",
        _key: `span-${keyIndex}`,
        text: part.value,
        marks: [key],
      });
      continue;
    }

    const segment = part.value;
    const tokenRegex =
      /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|([^[*]+)/g;
    let match;

    while ((match = tokenRegex.exec(segment)) !== null) {
      if (match[2] && match[3]) {
        const label = match[2];
        const href = match[3];
        const isInternal = href.startsWith("/");
        const key = `mark-${keyIndex++}`;
        markDefs.push(
          isInternal
            ? { _key: key, _type: "internalLink", href }
            : { _key: key, _type: "externalLink", href, blank: true },
        );
        children.push({
          _type: "span",
          _key: `span-${keyIndex}`,
          text: label,
          marks: [key],
        });
      } else if (match[5]) {
        children.push({
          _type: "span",
          _key: `span-${keyIndex++}`,
          text: match[5],
          marks: ["strong"],
        });
      } else if (match[6] && match[6].length > 0) {
        children.push({
          _type: "span",
          _key: `span-${keyIndex++}`,
          text: match[6],
          marks: [],
        });
      }
    }
  }

  if (children.length === 0) {
    children.push({
      _type: "span",
      _key: "span-0",
      text,
      marks: [],
    });
  }

  return { children, markDefs };
}

function makeBlock(
  style: string,
  text: string,
  listItem?: string,
  index = 0,
): PortableBlock {
  const { children, markDefs } = parseInline(text);
  return {
    _type: "block",
    _key: `block-${index}-${style}`,
    style,
    markDefs,
    children,
    ...(listItem ? { listItem, level: 1 } : {}),
  };
}

/** Node-friendly MDX → Portable Text converter for migration and fallback. */
export function mdxToPortableText(mdxBody: string): PortableBlock[] {
  const lines = mdxBody.split("\n");
  const blocks: PortableBlock[] = [];
  let listItems: string[] = [];
  let listType: "bullet" | "number" | null = null;

  const flushList = () => {
    if (!listType || listItems.length === 0) return;
    for (const item of listItems) {
      blocks.push(makeBlock("normal", item, listType, blocks.length));
    }
    listItems = [];
    listType = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      blocks.push(makeBlock("h2", trimmed.slice(3), undefined, blocks.length));
      continue;
    }
    if (trimmed.startsWith("### ")) {
      flushList();
      blocks.push(makeBlock("h3", trimmed.slice(4), undefined, blocks.length));
      continue;
    }
    if (trimmed.startsWith("- ")) {
      if (listType !== "bullet") {
        flushList();
        listType = "bullet";
      }
      listItems.push(trimmed.slice(2));
      continue;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      if (listType !== "number") {
        flushList();
        listType = "number";
      }
      listItems.push(trimmed.replace(/^\d+\.\s/, ""));
      continue;
    }

    flushList();
    blocks.push(makeBlock("normal", trimmed, undefined, blocks.length));
  }

  flushList();
  return blocks;
}
