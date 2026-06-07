interface LastUpdatedProps {
  date: string;
}

export function LastUpdated({ date }: LastUpdatedProps) {
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <p className="text-sm text-muted-foreground mb-4">
      <time dateTime={date}>Last updated: {formatted}</time>
    </p>
  );
}
