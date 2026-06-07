import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings"),
        ),
      S.divider(),
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("blogCategory").title("Categories"),
      S.documentTypeListItem("tag").title("Tags"),
    ]);
