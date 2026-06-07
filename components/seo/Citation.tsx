interface CitationProps {
  label: string;
  url: string;
  nofollow?: boolean;
}

export function Citation({ label, url, nofollow = false }: CitationProps) {
  return (
    <cite className="not-italic text-sm">
      <a
        href={url}
        target="_blank"
        rel={`noopener noreferrer${nofollow ? " nofollow" : ""}`}
        className="text-primary hover:underline"
      >
        {label}
      </a>
    </cite>
  );
}
