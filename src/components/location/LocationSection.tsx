
import { getGoogleMapsUrl, hotelConfig } from "@/lib/hotel-config";
import { SectionHeading } from "@/components/ui/SectionHeading";

const NEARBY_PLACES = [
  { name: "Ram Mandir", distance: "1.5 KM" },
  { name: "Hanuman Gadhi", distance: "1.5 KM" },
  { name: "Kanak Bhawan", distance: "1.8 KM" },
  { name: "Dashrath Mahal", distance: "1.6 KM" },
  { name: "Lata Chowk / Veena Chowk", distance: "1 KM" },
  { name: "Ram Paidi", distance: "1.2 KM" },
  { name: "Saryu River", distance: "1.2 KM" },
];

export function LocationSection() {
  const mapsUrl = getGoogleMapsUrl();
  const embedQuery = encodeURIComponent(hotelConfig.address);

  return (
    <section className="py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeading
            eyebrow="Location"
            title="Conveniently placed in Ayodhya"
            description="Hotel Raghuvar Residency is located near Ramsewak Puram, Ramghat, Ayodhya, putting you within easy reach of the city as you explore its spiritual and cultural sites."
          />

          <div className="mt-6 rounded-xl border border-stone bg-white p-5">
            <span className="eyebrow text-gold">Address</span>
            <p className="mt-2 font-display text-lg text-charcoal">{hotelConfig.address}</p>
          </div>

          <div className="mt-6 rounded-xl border border-stone bg-white p-5">
            <span className="eyebrow text-gold">Places to Visit &amp; Distance from the Hotel</span>
            <ul className="mt-3 divide-y divide-stone">
              {NEARBY_PLACES.map((place) => (
                <li key={place.name} className="flex items-center justify-between py-2 text-sm">
                  <span className="text-charcoal">{place.name}</span>
                  <span className="font-label text-maroon">{place.distance}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-maroon px-7 py-3.5 text-sm font-label font-medium text-ivory hover:bg-maroon-deep transition-colors"
          >
            Get Directions
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-card)] h-80 lg:h-[26rem]">
          {/* Standard embed via a plain query URL — no paid Maps API key required */}
          <iframe
            title="Hotel Raghuvar Residency location map"
            src={`https://www.google.com/maps?q=${embedQuery}&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

