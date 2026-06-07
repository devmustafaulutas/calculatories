import { defineQuery } from "next-sanity";

const authorFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  legacyId,
  role,
  jobTitle,
  bio,
  credentials,
  email,
  avatar,
  sameAs,
  knowsAbout
`;

const postListFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "category": blogCategory->title,
  "categorySlug": blogCategory->slug.current,
  "tags": tags[]->slug,
  "tagTitles": tags[]->title,
  "authorId": author->slug.current,
  "authorSlug": author->slug.current,
  "reviewerId": reviewer->slug.current,
  publishedAt,
  updatedAt,
  heroImage,
  "noindex": coalesce(seo.noindex, false)
`;

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(publishedAt) && coalesce(seo.noindex, false) != true]
  | order(publishedAt desc) {
    ${postListFields}
  }
`);

export const ALL_POSTS_QUERY = defineQuery(`
  *[_type == "post"]
  | order(publishedAt desc) {
    ${postListFields},
    body
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    heroImage,
    faq,
    seo,
    publishedAt,
    updatedAt,
    "category": blogCategory->title,
    "categorySlug": blogCategory->slug.current,
    "tags": tags[]->slug,
    "tagTitles": tags[]->title,
    "author": author->{${authorFields}},
    "reviewer": reviewer->{${authorFields}}
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(publishedAt) && coalesce(seo.noindex, false) != true]{
    "slug": slug.current
  }
`);

export const AUTHORS_QUERY = defineQuery(`
  *[_type == "author"] | order(name asc) {
    ${authorFields}
  }
`);

export const AUTHOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "author" && (slug.current == $slug || legacyId == $slug)][0] {
    ${authorFields}
  }
`);

export const BLOG_CATEGORIES_QUERY = defineQuery(`
  *[_type == "blogCategory"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    seo
  }
`);

export const TAGS_QUERY = defineQuery(`
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    seo
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    organizationName,
    legalName,
    email,
    foundingDate,
    sameAs,
    defaultOgImage,
    nav
  }
`);

export const POSTS_BY_AUTHOR_QUERY = defineQuery(`
  *[_type == "post" && defined(publishedAt) && coalesce(seo.noindex, false) != true && author->slug.current == $slug]
  | order(publishedAt desc) {
    ${postListFields}
  }
`);

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "post" && defined(publishedAt) && coalesce(seo.noindex, false) != true && lower(blogCategory->slug.current) == lower($category)]
  | order(publishedAt desc) {
    ${postListFields}
  }
`);

export const POSTS_BY_TAG_QUERY = defineQuery(`
  *[_type == "post" && defined(publishedAt) && coalesce(seo.noindex, false) != true && $tag in tags[]->slug]
  | order(publishedAt desc) {
    ${postListFields}
  }
`);

export const TOOL_BLOG_LINKS_QUERY = defineQuery(`
  *[_type == "post" && defined(publishedAt) && coalesce(seo.noindex, false) != true && slug.current in $slugs][0] {
    title,
    "slug": slug.current,
    excerpt
  }
`);
