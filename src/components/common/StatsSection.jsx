const stats = [
  {
    value: "1,200+",
    label: "Properties Listed",
  },
  {
    value: "850+",
    label: "Happy Buyers",
  },
  {
    value: "350+",
    label: "Trusted Owners",
  },
  {
    value: "98%",
    label: "Customer Satisfaction",
  },
];

function StatsSection() {
  return (
    <section className="bg-primary py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
        {stats.map(
          ({ value, label }) => (
            <div
              key={label}
              className="border-l border-white/10 pl-5"
            >
              <p className="font-body text-4xl font-extrabold tracking-tight text-white">
                {value}
              </p>

              <p className="mt-2 font-body text-xs font-medium text-white/45">
                {label}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default StatsSection;