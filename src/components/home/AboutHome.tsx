import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutHome() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-px mx-auto max-w-4xl text-center">
        <SectionHeading
          eyebrow="About Us"
          title="Hotel Raghuvar Residency, Ayodhya"
          align="center"
          className="mx-auto"
        />

        <div className="mt-6 space-y-4 text-sm md:text-base leading-relaxed text-charcoal-soft text-left md:text-center">
          <p>
            Hotel Raghuvar Residency, Ayodhya is a luxurious haven for travellers seeking comfort,
            elegance, and world-class hospitality.
          </p>
          <p>
            With its unwavering commitment to excellence, Hotel Raghuvar Residency boasts a{" "}
            <span className="font-label text-maroon">4.7 rating</span> based on guest reviews,
            showcasing its dedication to guest satisfaction and premium service — bestowing
            excellent hospitality on every category of guest.
          </p>
          <p>
            Hotel Raghuvar Residency reflects the culture and ethos of its location — with a
            perfect fusion of contemporary decor in its sumptuous interiors, the hotel sets the
            bar of service much higher than the expectations of its guests.
          </p>
        </div>
      </div>
    </section>
  );
}

