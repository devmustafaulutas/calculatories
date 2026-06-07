import { defineField, defineType } from "sanity";

export const navItem = defineType({
  name: "navItem",
  title: "Navigation item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "external",
      title: "External link",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
