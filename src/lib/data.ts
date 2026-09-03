import { getSupabaseServerClient } from "./supabase/server";
import {
  demoGallery,
  demoHotelSettings,
  demoRooms,
  demoTestimonials,
  ayodhyaAttractions,
} from "./demo-data";
import type { Attraction, GalleryItem, HotelSettings, Room, RoomImage, Testimonial } from "./types";

/**
 * All data-fetching for the public site lives here. Each function tries
 * Supabase first (only when env vars are configured) and gracefully falls
 * back to demo data — so the site never shows a blank/broken page while
 * the owner is still setting up their database.
 */

export async function getRooms(): Promise<{ rooms: Room[]; isDemo: boolean }> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return { rooms: demoRooms, isDemo: true };

  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error || !data || data.length === 0) {
    return { rooms: demoRooms, isDemo: true };
  }
  return { rooms: data as Room[], isDemo: false };
}

export async function getRoomBySlug(
  slugParam: string,
): Promise<{ room: Room | null; isDemo: boolean }> {
  // Room links are built from `room.slug` and admin-entered slugs can
  // pick up stray whitespace or inconsistent casing from copy/paste, so
  // normalise before matching or a perfectly valid room silently 404s.
  const slug = decodeURIComponent(slugParam).trim();

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return {
      room: demoRooms.find((r) => r.slug.toLowerCase() === slug.toLowerCase()) ?? null,
      isDemo: true,
    };
  }

  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (!error && data) {
    return { room: data as Room, isDemo: false };
  }

  // Exact match failed — fall back to a case-insensitive lookup before
  // giving up, so a slug saved as "Deluxe-Room" still resolves for a
  // link generated as "deluxe-room" (or vice versa).
  const { data: ciData, error: ciError } = await supabase
    .from("rooms")
    .select("*")
    .ilike("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (!ciError && ciData) {
    return { room: ciData as Room, isDemo: false };
  }

  return {
    room: demoRooms.find((r) => r.slug.toLowerCase() === slug.toLowerCase()) ?? null,
    isDemo: true,
  };
}

/**
 * A room's full photo gallery (from the "room images" section in the
 * admin panel). If none have been added yet, falls back to just the
 * room's single featured image so the detail page still shows a photo
 * instead of "Image coming soon" whenever a featured image exists.
 */
export async function getRoomImages(room: Room): Promise<RoomImage[]> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("room_images")
      .select("*")
      .eq("room_id", room.id)
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data as RoomImage[];
    }
  }

  if (room.featured_image) {
    return [
      {
        id: "featured",
        room_id: room.id,
        image_url: room.featured_image,
        alt_text: room.name,
        sort_order: 0,
        created_at: room.created_at,
      },
    ];
  }

  return [];
}

export async function getGallery(): Promise<{ items: GalleryItem[]; isDemo: boolean }> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return { items: demoGallery, isDemo: true };

  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    return { items: demoGallery, isDemo: true };
  }
  return { items: data as GalleryItem[], isDemo: false };
}

export async function getHotelSettings(): Promise<HotelSettings> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return demoHotelSettings;

  const { data, error } = await supabase
    .from("hotel_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error || !data) return demoHotelSettings;
  return data as HotelSettings;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return demoTestimonials;

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true);

  if (error || !data) return demoTestimonials;
  return data as Testimonial[];
}

export async function getAttractions(): Promise<{ items: Attraction[]; isDemo: boolean }> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return { items: ayodhyaAttractions, isDemo: true };

  const { data, error } = await supabase
    .from("attractions")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    return { items: ayodhyaAttractions, isDemo: true };
  }
  return { items: data as Attraction[], isDemo: false };
}

      
