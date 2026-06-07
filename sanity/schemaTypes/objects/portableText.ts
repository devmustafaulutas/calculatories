import { defineArrayMember, defineField, defineType } from "sanity";

export const bodyPortableText = defineType({
  name: "bodyPortableText",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "citation",
            type: "object",
            title: "Citation",
            fields: [
              defineField({ name: "label", type: "string", title: "Label" }),
              defineField({ name: "url", type: "url", title: "URL" }),
              defineField({ name: "nofollow", type: "boolean", title: "Nofollow" }),
            ],
          },
          {
            name: "internalLink",
            type: "object",
            title: "Internal link",
            fields: [
              defineField({ name: "href", type: "string", title: "Path" }),
            ],
          },
          {
            name: "externalLink",
            type: "object",
            title: "External link",
            fields: [
              defineField({ name: "href", type: "url", title: "URL" }),
              defineField({
                name: "blank",
                type: "boolean",
                title: "Open in new tab",
                initialValue: true,
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
  ],
});

export const simplePortableText = defineType({
  name: "simplePortableText",
  title: "Simple text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [],
        annotations: [],
      },
    }),
  ],
});
