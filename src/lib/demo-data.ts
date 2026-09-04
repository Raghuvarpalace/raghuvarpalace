// ────────────────────────────────────────────────────────────────────────
// DEMO DATA — for local development and as a fallback when Supabase is not
// yet configured or a table is empty. NONE of this should be mistaken for
// real hotel information:
//   • Room prices are left as `null` → the UI always shows "Price on request"
//   • No testimonials are included (fabricated reviews are never allowed)
//   • Image URLs are intentionally empty so the site renders tasteful
//     placeholders (see <ImageFallback />) instead of any stock/copyrighted
//     photography. Replace with real Supabase Storage URLs when available.
//   • Amenities/attractions mirror the candidate lists supplied in the
//     project brief — confirm each one with the hotel owner before launch.
// ────────────────────────────────────────────────────────────────────────

import type { Attraction, GalleryItem, HotelSettings, Room, Testimonial } from "./types";
import { hotelConfig } from "./hotel-config";

export const demoHotelSettings: HotelSettings = {
  id: "demo",
  hotel_name: hotelConfig.name,
  address: hotelConfig.address,
  phone: hotelConfig.phone || null,
  whatsapp: hotelConfig.whatsapp || null,
  email: hotelConfig.email || null,
  google_maps_url: hotelConfig.googleMapsUrl || null,
  description:
    "A premium and comfortable stay in Ayodhya for pilgrims, families, tourists and business travellers.",
  hero_image: null,
  logo_url: null,
  updated_at: new Date().toISOString(),
};

export const demoRooms: Room[] = [
  {
    id: "demo-deluxe-room",
    name: "Deluxe Room",
    slug: "deluxe-room",
    short_description:
      "A comfortable, well-appointed room suited to families and solo travellers.",
    description:
      "Experience a perfect blend of comfort and convenience. Our rooms are thoughtfully designed with modern interiors, plush bedding, and clean, well-maintained attached bathrooms to ensure a relaxing stay. Premium mattresses and fresh, clean linen make for a restful sleep, in a quiet atmosphere ideal for unwinding after a day of exploring Ayodhya.",
    price: null,
    max_guests: 2,
    bed_type: "1 Double Bed",
    amenities: ["Air Conditioning", "Wi-Fi", "Television", "Hot Water", "Housekeeping"],
    featured_image: null,
    extra_child_charge: 349,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-super-deluxe-room",
    name: "Super Deluxe Room",
    slug: "super-deluxe-room",
    short_description: "Extra space and comfort, well suited to small families.",
    description:
      "The Super Deluxe Room offers a perfect blend of comfort and convenience, with modern interiors, plush bedding, and a clean, well-maintained attached bathroom. Premium mattresses and fresh linen ensure a restful sleep, while the quiet atmosphere makes it an ideal retreat after a day of exploring Ayodhya.",
    price: null,
    max_guests: 3,
    bed_type: "1 Double Bed + Extra Bed (on request)",
    amenities: ["Air Conditioning", "Wi-Fi", "Television", "Hot Water", "Room Service"],
    featured_image: null,
    extra_child_charge: 349,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-family-room",
    name: "Family Room",
    slug: "family-room",
    short_description: "A spacious option for families travelling together.",
    description:
      "The Family Room brings together comfort and convenience for guests travelling as a group, with modern interiors, plush bedding, and a clean, well-maintained attached bathroom. Premium mattresses and fresh linen ensure a restful sleep, in a peaceful, quiet atmosphere perfect for relaxing after a day of exploring Ayodhya.",
    price: null,
    max_guests: 4,
    bed_type: "2 Beds",
    amenities: ["Air Conditioning", "Wi-Fi", "Television", "Hot Water", "Family Friendly"],
    featured_image: null,
    extra_child_charge: 349,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Candidate amenities from the brief — confirm each with the owner.
export const demoAmenities = [
  "Comfortable Rooms",
  "Wi-Fi",
  "Air Conditioning",
  "Room Service",
  "Housekeeping",
  "Parking",
  "Hot Water",
  "Television",
  "Family Friendly",
  "24/7 Support",
];

export const demoGallery: GalleryItem[] = [
  { id: "g1", title: "Hotel Frontage", image_url: "", category: "Exterior", alt_text: "Hotel Raghuvar Residency hotel exterior", sort_order: 1, is_active: true, created_at: new Date().toISOString() },
  { id: "g2", title: "Deluxe Room", image_url: "", category: "Rooms", alt_text: "Deluxe room interior", sort_order: 2, is_active: true, created_at: new Date().toISOString() },
  { id: "g3", title: "Lobby", image_url: "", category: "Interiors", alt_text: "Hotel lobby", sort_order: 3, is_active: true, created_at: new Date().toISOString() },
  { id: "g4", title: "Family Room", image_url: "", category: "Rooms", alt_text: "Family room interior", sort_order: 4, is_active: true, created_at: new Date().toISOString() },
  { id: "g5", title: "Hallway", image_url: "", category: "Hotel", alt_text: "Hotel hallway", sort_order: 5, is_active: true, created_at: new Date().toISOString() },
  { id: "g6", title: "Saryu Ghat, Ayodhya", image_url: "", category: "Nearby Ayodhya", alt_text: "Saryu river ghat near the hotel", sort_order: 6, is_active: true, created_at: new Date().toISOString() },
];

// No fabricated reviews — empty by default. Populate once the hotel
// shares real, verifiable guest feedback.
export const demoTestimonials: Testimonial[] = [];

// Distances/travel times are intentionally omitted — do not invent them.
// Image URLs are left null on purpose: real, licensed photos for each place
// should be uploaded via Admin → Discover Ayodhya (Photo field), not linked
// from third-party websites.
export const ayodhyaAttractions: Attraction[] = [
  {
    id: "demo-a1",
    name: "Shri Ram Janmabhoomi Mandir",
    description:
      "The sacred site revered as Lord Ram's birthplace, home to the newly consecrated Ram Mandir with its magnificent carvings and the Ram Darbar — Ayodhya's most iconic stop.",
    image_url: null,
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-a2",
    name: "Hanuman Garhi",
    description:
      "A fort-like temple reached by 76 steps, dedicated to Lord Hanuman. Tradition holds it is the first shrine every pilgrim visits before Ram Janmabhoomi.",
    image_url: null,
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-a3",
    name: "Kanak Bhawan",
    description:
      "Known as the 'golden palace', this temple is believed to have been gifted to Sita as her royal residence and is admired for its ornate, gilded interiors.",
    image_url: null,
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-a4",
    name: "Nageshwarnath Temple",
    description:
      "An ancient Shiva temple traditionally said to have been established by Kush, son of Lord Ram, drawing large crowds during Shivratri and Kartik Purnima.",
    image_url: null,
    sort_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-a5",
    name: "Dashrath Mahal",
    description:
      "Believed to be the royal residence of King Dashrath, Lord Ram's father. Also called Bada Asthan, it houses shrines of the Ram Parivar amid vibrant murals.",
    image_url: null,
    sort_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-a6",
    name: "Sita Ki Rasoi",
    description:
      "A revered site near Ram Janmabhoomi believed to be Goddess Sita's kitchen, preserving old cooking vessels as a symbol of devotion and domestic harmony.",
    image_url: null,
    sort_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-a7",
    name: "Treta Ke Thakur",
    description:
      "An ancient temple said to mark the spot of Lord Ram's Ashwamedha Yagya, home to centuries-old black stone idols of Ram, Sita, Lakshman, Bharat and Shatrughna.",
    image_url: null,
    sort_order: 7,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-a8",
    name: "Ram Ki Paidi (Saryu Ghat)",
    description:
      "A beautifully lit series of ghats along the Saryu River where pilgrims take a holy dip and gather each evening for the riverside aarti.",
    image_url: null,
    sort_order: 8,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-a9",
    name: "Guptar Ghat",
    description:
      "A tranquil ghat on the Saryu, traditionally believed to be where Lord Ram took jal samadhi — a peaceful spot for reflection and riverside sunsets.",
    image_url: null,
    sort_order: 9,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-a10",
    name: "Mani Parvat",
    description:
      "A historic hillock linked to the Ramayana and, by tradition, to Emperor Ashoka, offering a quiet walk and a wide view over the city.",
    image_url: null,
    sort_order: 10,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-a11",
    name: "Tulsi Smarak Bhawan",
    description:
      "A memorial to the saint-poet Goswami Tulsidas, built on the spot where he is believed to have composed the Ramcharitmanas.",
    image_url: null,
    sort_order: 11,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-a12",
    name: "Chhoti Devkali Mandir",
    description:
      "A quieter, less-crowded temple dedicated to the Goddess, considered Sita's kuldevi (family deity), known for its calm and unhurried darshan.",
    image_url: null,
    sort_order: 12,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];
    
