import { author } from "./author";
import { blogCategory } from "./blogCategory";
import { faqItem } from "./objects/faqItem";
import { navItem } from "./objects/navItem";
import { bodyPortableText, simplePortableText } from "./objects/portableText";
import { seo } from "./objects/seo";
import { post } from "./post";
import { siteSettings } from "./siteSettings";
import { tag } from "./tag";

export const schemaTypes = [
  post,
  author,
  blogCategory,
  tag,
  siteSettings,
  seo,
  faqItem,
  navItem,
  bodyPortableText,
  simplePortableText,
];
