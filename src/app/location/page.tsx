import type { Metadata } from "next";
import { LocationSection } from "@/components/location/LocationSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAttractions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Location",
  description: "Hotel Raghuvar Residency is located near Ramsewak Puram, Ramghat, Ayodhya, Ayodhya, Uttar Pradesh, India.",
  alternates: { canonical: "/location" },
};

export default async function LocationPage() {
  const { items: attractions } = await getAttractions();

  return (
    <div className="py-16 md:py-24">
      <LocationSection />

      <div className="container-px mx-auto max-w-7xl mt-8">
        <SectionHeading eyebrow="Nearby" title="Places to visit in Ayodhya" />
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {attractions.map((place) => (
            <li key={place.name} className="rounded-xl border border-stone bg-white p-5">
              <h3 className="font-display text-base text-maroon">{place.name}</h3>
              <p className="mt-1 text-sm text-charcoal-soft">{place.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
