import { locations } from "@/data/locations";
import type { LocationVariant } from "@/data/schemas/location";
import { locationPath } from "@/lib/urls";

export type { LocationVariant };

export function getAllLocations(): LocationVariant[] {
  return locations;
}

export function getLocationsForTool(toolSlug: string): LocationVariant[] {
  return locations.filter((l) => l.toolSlug === toolSlug);
}

export function getLocationVariant(
  categorySlug: string,
  toolSlug: string,
  locationSlug: string,
): LocationVariant | undefined {
  return locations.find(
    (l) =>
      l.categorySlug === categorySlug &&
      l.toolSlug === toolSlug &&
      l.slug === locationSlug,
  );
}

export function getAllProgrammaticUrls(): { url: string; lastModified: string }[] {
  return locations.map((l) => ({
    url: locationPath(l.categorySlug, l.toolSlug, l.slug),
    lastModified: l.localizedData.asOf,
  }));
}
