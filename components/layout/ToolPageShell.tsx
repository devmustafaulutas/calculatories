import { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Byline } from "@/components/seo/Byline";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { HeaderAd } from "@/components/ads/HeaderAd";
import { SidebarAd } from "@/components/ads/SidebarAd";
import type { Tool } from "@/data/schemas/tool";
import { getCategory } from "@/lib/categories";
import { categoryPath } from "@/lib/urls";

interface ToolPageShellProps {
  tool: Tool;
  children: ReactNode;
  content: ReactNode;
}

export async function ToolPageShell({
  tool,
  children,
  content,
}: ToolPageShellProps) {
  const category = getCategory(tool.category);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            {
              label: category?.name ?? tool.category,
              href: categoryPath(tool.category),
            },
            { label: tool.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{tool.h1}</h1>

            {tool.isYMYL && (
              <>
                <Byline
                  authorId={tool.authorId}
                  reviewerId={tool.reviewedBy}
                />
                <LastUpdated date={tool.updatedAt} />
              </>
            )}

            <HeaderAd />

            <div className="mb-8">{children}</div>

            <p className="text-lg text-muted-foreground mb-8">
              {tool.longDescription}
            </p>

            {content}
          </div>

          <aside className="hidden lg:block">
            <SidebarAd />
          </aside>
        </div>
      </div>
    </div>
  );
}
