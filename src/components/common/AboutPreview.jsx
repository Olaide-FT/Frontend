import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function AboutPreview() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"
            alt="Modern Nestora home"
            className="aspect-[4/5] w-full rounded-xl object-cover"
          />

          <div className="absolute -bottom-6 right-4 max-w-[220px] rounded-xl bg-primary p-5 shadow-xl sm:right-8">
            <p className="font-body text-3xl font-extrabold text-accent">
              24/7
            </p>

            <p className="mt-1 font-body text-xs leading-5 text-white/55">
              Discover property opportunities whenever you're ready.
            </p>
          </div>
        </div>

        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            About Nestora
          </p>

          <h2 className="mt-4 font-body text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl">
            A better way to navigate real estate.
          </h2>

          <p className="mt-6 font-body text-sm leading-7 text-primary/50">
            Nestora brings buyers, property owners and
            trusted listings together through a modern,
            transparent and intuitive real-estate experience.
          </p>

          <p className="mt-4 font-body text-sm leading-7 text-primary/50">
            Whether you're searching for your first apartment,
            your next family home or an investment opportunity,
            we're here to make the journey simpler.
          </p>

          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-body text-sm font-semibold text-white"
          >
            Discover our story
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;