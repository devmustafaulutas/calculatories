import { defineField, defineType } from "sanity";
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "legacyId",
      title: "Legacy ID",
      description:
        "Optional legacy identifier used by tool registry (e.g. dr-emily-walsh)",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jobTitle",
      title: "Job title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "simplePortableText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "sameAs",
      title: "Social profiles",
      type: "array",
      of: [{ type: "url" }],
    }),
    defineField({
      name: "knowsAbout",
      title: "Knows about",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "jobTitle", media: "avatar" },
  },
});
