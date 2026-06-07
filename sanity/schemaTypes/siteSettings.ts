import { defineField, defineType } from "sanity";
import { navItem } from "./objects/navItem";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "organizationName",
      title: "Organization name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "legalName",
      title: "Legal name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
    }),
    defineField({
      name: "foundingDate",
      title: "Founding date",
      type: "string",
    }),
    defineField({
      name: "sameAs",
      title: "Social profiles",
      type: "array",
      of: [{ type: "url" }],
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default OG image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "nav",
      title: "Navigation links",
      type: "array",
      of: [{ type: "navItem" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
