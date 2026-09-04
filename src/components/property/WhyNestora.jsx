import {
  ShieldCheck,
  Compass,
  MessageSquareText,
  BadgeCheck,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    description:
      "We make property discovery more trustworthy by prioritising verified listings.",
  },
  {
    icon: Compass,
    title: "Expert Guidance",
    description:
      "Find your way through the property market with a platform built around simplicity.",
  },
  {
    icon: MessageSquareText,
    title: "Direct Communication",
    description:
      "Connect directly with property owners and get the information you need.",
  },
  {
    icon: BadgeCheck,
    title: "A Better Experience",
    description:
      "A carefully designed platform that makes searching for property feel effortless.",
  },
];

function WhyNestora() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Why Nestora
          </p>

          <h2 className="mt-3 font-body text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Property search, thoughtfully simplified.
          </h2>

          <p className="mt-4 font-body text-sm leading-7 text-primary/45">
            Everything you need to discover, evaluate and
            connect with properties in one elegant experience.
          </p>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(
            ({
              icon: Icon,
              title,
              description,
            }) => (
              <div key={title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-accent">
                  <Icon size={20} />
                </div>

                <h3 className="mt-6 font-body text-base font-semibold text-primary">
                  {title}
                </h3>

                <p className="mt-3 font-body text-sm leading-6 text-primary/45">
                  {description}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default WhyNestora;